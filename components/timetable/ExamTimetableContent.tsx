"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import {
  Calendar,
  CalendarDays,
  Download,
  ExternalLink,
  FileText,
  Loader2,
} from "lucide-react";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type SemesterFilter = "all" | 1 | 2;

// ── Per-card component — resolves its own URL ──────────────────────────────
function TimetableCard({
  id,
  title,
  description,
  semester,
  storageId,
  uploadedAt,
  downloads,
  index,
}: {
  id: Id<"examTimetable">;
  title: string;
  description?: string;
  semester?: 1 | 2;
  storageId: Id<"_storage">;
  uploadedAt?: number;
  downloads?: number;
  index: number;
}) {
  const url = useQuery(api.timetable.getTimetableUrl, { storageId });
  const trackDownload = useMutation(api.timetable.trackDownload);

  const handleDownload = async () => {
    if (!url) return;
    await trackDownload({ id });
    const a = document.createElement("a");
    a.href = url;
    a.download = `${title}.pdf`;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    a.click();
  };

  const formattedDate = uploadedAt
    ? new Date(uploadedAt).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : null;

  const semesterLabel = semester ? `Semester ${semester}` : null;
  const semesterColor =
    semester === 1
      ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
      : semester === 2
        ? "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300"
        : "bg-muted text-muted-foreground";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className='flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
      {/* Accent bar */}
      <div
        className={`h-1 w-full ${semester === 1 ? "bg-blue-500" : semester === 2 ? "bg-violet-500" : "bg-primary"}`}
      />

      {/* Card header */}
      <div className='flex items-start gap-3 p-5 pb-4'>
        <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5'>
          <CalendarDays
            className='w-5 h-5 text-primary'
            aria-hidden='true'
          />
        </div>
        <div className='min-w-0 flex-1'>
          <div className='flex items-center gap-2 flex-wrap mb-1'>
            <h3 className='font-semibold text-foreground text-base leading-snug'>
              {title}
            </h3>
            {semesterLabel && (
              <span
                className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full flex-shrink-0 ${semesterColor}`}>
                {semesterLabel}
              </span>
            )}
          </div>
          {description && (
            <p className='text-muted-foreground text-sm leading-relaxed'>
              {description}
            </p>
          )}
          <div className='flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground'>
            {formattedDate && (
              <span className='flex items-center gap-1'>
                <Calendar className='w-3 h-3' />
                {formattedDate}
              </span>
            )}
            {!!downloads && downloads > 0 && (
              <span className='flex items-center gap-1'>
                <Download className='w-3 h-3' />
                {downloads.toLocaleString()} download
                {downloads !== 1 ? "s" : ""}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* PDF Preview */}
      <div className='mx-4 mb-4 rounded-xl overflow-hidden border border-border bg-muted'>
        {url === undefined ? (
          // Loading skeleton for the preview
          <div className='h-[480px] flex flex-col items-center justify-center gap-3 bg-muted'>
            <Loader2 className='w-6 h-6 animate-spin text-muted-foreground' />
            <span className='text-xs text-muted-foreground'>
              Loading preview…
            </span>
          </div>
        ) : url === null ? (
          // File not accessible
          <div className='h-[480px] flex flex-col items-center justify-center gap-3'>
            <FileText className='w-10 h-10 text-muted-foreground/30' />
            <span className='text-sm text-muted-foreground'>
              Preview unavailable
            </span>
          </div>
        ) : (
          <iframe
            src={`${url}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
            title={`Preview of ${title}`}
            className='w-full h-[480px]'
            aria-label={`PDF preview: ${title}`}
          />
        )}
      </div>

      {/* Download button */}
      <div className='px-4 pb-5'>
        <button
          onClick={handleDownload}
          disabled={!url}
          aria-label={`Download ${title} as PDF`}
          className='flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>
          {url === undefined ? (
            <>
              <Loader2 className='w-4 h-4 animate-spin' />
              Loading…
            </>
          ) : (
            <>
              <Download className='w-4 h-4' />
              Download PDF
              <ExternalLink className='w-3.5 h-3.5 opacity-60' />
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ── Filter pill ────────────────────────────────────────────────────────────
function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
      }`}>
      {children}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function ExamTimetableContent() {
  const [semesterFilter, setSemesterFilter] = useState<SemesterFilter>("all");

  const timetables = useQuery(api.timetable.getAllTimetables);
  const isLoading = timetables === undefined;

  const filtered =
    timetables?.filter((t) =>
      semesterFilter === "all" ? true : t.semester === semesterFilter
    ) ?? [];

  return (
    <div className='min-h-screen bg-background'>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className='relative overflow-hidden bg-gradient-to-br from-primary dark:from-gray-700 via-primary/90 to-primary/80 py-16 sm:py-20 lg:py-24'>
        <div
          className='absolute inset-0 bg-[url("/pattern.png")] opacity-5'
          aria-hidden='true'
        />
        <div
          className='absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#FFDC55]/10 blur-3xl pointer-events-none'
          aria-hidden='true'
        />
        <div
          className='absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none'
          aria-hidden='true'
        />

        <div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <span className='inline-block mb-4 px-4 py-1.5 rounded-full bg-[#FFDC55]/15 border border-[#FFDC55]/35 text-[#FFDC55] text-sm font-semibold tracking-wide'>
            Academic Calendar
          </span>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight'>
            Exam Timetable
          </h1>
          <p className='mt-4 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed'>
            View and download the official examination schedule. Preview each
            timetable directly on this page before downloading.
          </p>

          {/* Semester legend */}
          <div className='mt-8 flex flex-wrap gap-4'>
            {[
              { label: "Semester 1", color: "bg-blue-400" },
              { label: "Semester 2", color: "bg-violet-400" },
            ].map(({ label, color }) => (
              <div
                key={label}
                className='flex items-center gap-2 text-white/75 text-sm'>
                <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Content ───────────────────────────────────────────────────── */}
      <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        {/* Semester filter */}
        <div className='flex flex-wrap gap-2 mb-8'>
          <Pill
            active={semesterFilter === "all"}
            onClick={() => setSemesterFilter("all")}>
            All Semesters
          </Pill>
          <Pill
            active={semesterFilter === 1}
            onClick={() => setSemesterFilter(1)}>
            Semester 1
          </Pill>
          <Pill
            active={semesterFilter === 2}
            onClick={() => setSemesterFilter(2)}>
            Semester 2
          </Pill>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className='grid sm:grid-cols-2 gap-6'>
            {[...Array(2)].map((_, i) => (
              <div key={i} className='rounded-2xl overflow-hidden border border-border'>
                <div className='h-1 bg-muted' />
                <div className='p-5 space-y-3'>
                  <Skeleton className='h-5 w-3/4 rounded-lg' />
                  <Skeleton className='h-3 w-1/2 rounded-lg' />
                </div>
                <Skeleton className='mx-4 h-[480px] rounded-xl' />
                <div className='px-4 py-5'>
                  <Skeleton className='h-11 w-full rounded-xl' />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 text-center gap-3'>
            <div className='w-16 h-16 rounded-2xl bg-muted flex items-center justify-center'>
              <CalendarDays className='w-8 h-8 text-muted-foreground/40' />
            </div>
            <p className='text-lg font-semibold text-foreground'>
              {semesterFilter === "all"
                ? "No timetables available"
                : `No Semester ${semesterFilter} timetable available`}
            </p>
            <p className='text-sm text-muted-foreground'>
              Check back later or contact the academic office.
            </p>
            {semesterFilter !== "all" && (
              <button
                onClick={() => setSemesterFilter("all")}
                className='mt-1 text-sm text-primary hover:underline font-semibold'>
                View all semesters
              </button>
            )}
          </div>
        ) : (
          <div className='grid sm:grid-cols-2 gap-6'>
            {filtered.map((t, i) => (
              <TimetableCard
                key={t._id}
                id={t._id}
                title={t.title}
                description={t.description}
                semester={t.semester}
                storageId={t.file}
                uploadedAt={t.uploadedAt}
                downloads={t.downloads}
                index={i}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
