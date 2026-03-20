"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Id } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Calendar, Download, FileText, Loader2 } from "lucide-react";
import { useState } from "react";

// ── Per-card component — each card resolves its own storage URL ────────────
function FeeCard({
  id,
  title,
  description,
  storageId,
  uploadedAt,
  downloads,
  index,
}: {
  id: Id<"fees">;
  title: string;
  description?: string;
  storageId: Id<"_storage">;
  uploadedAt?: number;
  downloads?: number;
  index: number;
}) {
  const url = useQuery(api.fees.getFeeUrl, { storageId });
  const trackDownload = useMutation(api.fees.trackDownload);
  const [downloading, setDownloading] = useState(false);

  const handleDownload = async () => {
    if (!url) return;
    setDownloading(true);
    try {
      await trackDownload({ id });
      const res = await fetch(url);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = `${title}.pdf`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    } finally {
      setDownloading(false);
    }
  };

  const formattedDate = uploadedAt
    ? new Date(uploadedAt).toLocaleDateString("en-NG", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className='group flex flex-col rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden'>
      <div className='h-1 w-full bg-primary' />
      <div className='flex flex-col flex-1 p-5 sm:p-6'>
        <div className='flex items-start gap-4 mb-4'>
          <div className='w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0'>
            <FileText className='w-5 h-5 text-primary' aria-hidden='true' />
          </div>
          <div className='min-w-0'>
            <h3 className='font-semibold text-foreground text-base leading-snug'>
              {title}
            </h3>
            {description && (
              <p className='text-muted-foreground text-sm mt-1 leading-relaxed'>
                {description}
              </p>
            )}
          </div>
        </div>
        <div className='flex flex-wrap gap-3 text-xs text-muted-foreground mb-5 mt-auto'>
          {formattedDate && (
            <div className='flex items-center gap-1.5'>
              <Calendar className='w-3.5 h-3.5' aria-hidden='true' />
              {formattedDate}
            </div>
          )}
          {!!downloads && downloads > 0 && (
            <div className='flex items-center gap-1.5'>
              <Download className='w-3.5 h-3.5' aria-hidden='true' />
              {downloads.toLocaleString()} download{downloads !== 1 ? "s" : ""}
            </div>
          )}
        </div>
        <button
          onClick={handleDownload}
          disabled={!url || downloading}
          aria-label={`Download ${title} as PDF`}
          className='flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed'>
          {url === undefined || downloading ? (
            <>
              <Loader2 className='w-4 h-4 animate-spin' />
              {downloading ? "Downloading…" : "Loading…"}
            </>
          ) : (
            <>
              <Download className='w-4 h-4' />
              Download PDF
            </>
          )}
        </button>
      </div>
    </motion.div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function FeesContainer() {
  const fees = useQuery(api.fees.getAllFees);
  const isLoading = fees === undefined;

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
            Tuition &amp; Fees
          </span>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight'>
            Fee Structure
          </h1>
          <p className='mt-4 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed'>
            Download the official fee schedule for your programme. All documents
            are provided in PDF format.
          </p>
        </div>
      </section>

      {/* ── Fee documents ─────────────────────────────────────────────── */}
      <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        {isLoading ? (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className='h-52 w-full rounded-2xl' />
            ))}
          </div>
        ) : fees.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 text-center gap-3'>
            <div className='w-16 h-16 rounded-2xl bg-muted flex items-center justify-center'>
              <FileText className='w-8 h-8 text-muted-foreground/40' />
            </div>
            <p className='text-lg font-semibold text-foreground'>
              No fee documents available
            </p>
            <p className='text-sm text-muted-foreground'>
              Check back later or contact the admissions office.
            </p>
          </div>
        ) : (
          <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {fees.map((fee, i) => (
              <FeeCard
                key={fee._id}
                id={fee._id}
                title={fee.title}
                description={fee.description}
                storageId={fee.file}
                uploadedAt={fee.uploadedAt}
                downloads={fee.downloads}
                index={i}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
