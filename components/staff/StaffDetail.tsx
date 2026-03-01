"use client";

import { SafeHTMLRenderer } from "@/components/SafeHTMLRenderer";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { BookOpen, Linkedin, Mail, Users, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────
const FEATURED_STAFF = { firstName: "Christian", lastName: "Anieke" } as const;

// ── Types ─────────────────────────────────────────────────────────────────────
type StaffMember = NonNullable<
  ReturnType<typeof useQuery<typeof api.staff.getStaff>>
>[0];

// ── Staff Card ────────────────────────────────────────────────────────────────
function StaffCard({
  staff,
  index,
  reducedMotion,
  onSelect,
}: {
  staff: StaffMember;
  index: number;
  reducedMotion: boolean | null;
  onSelect: () => void;
}) {
  return (
    <motion.div
      initial={reducedMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className='group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300'>
      {/* Photo */}
      <div className='relative aspect-square overflow-hidden bg-muted flex-shrink-0'>
        <Image
          src={staff.imageUrl || "/default-avatar.png"}
          alt={`Portrait of ${staff.name}`}
          fill
          className='object-cover object-top transition-transform duration-500 group-hover:scale-105'
          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
          priority={index < 4}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
      </div>

      {/* Body */}
      <div className='flex flex-col flex-1 p-5 text-center'>
        <h3 className='font-bold text-foreground text-base leading-snug mb-1'>
          {staff.name}
        </h3>
        <p className='text-sm text-primary font-medium mb-4'>{staff.role}</p>

        <div className='mt-auto flex items-center justify-center gap-2'>
          {staff.email && (
            <a
              href={`mailto:${staff.email}`}
              className='w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors'
              aria-label={`Email ${staff.name}`}>
              <Mail className='w-4 h-4' />
            </a>
          )}
          {staff.linkedin && (
            <a
              href={staff.linkedin}
              target='_blank'
              rel='noopener noreferrer'
              className='w-8 h-8 rounded-lg bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors'
              aria-label={`LinkedIn profile of ${staff.name}`}>
              <Linkedin className='w-4 h-4' />
            </a>
          )}
          {staff.profile && (
            <button
              onClick={onSelect}
              className='flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground text-xs font-semibold transition-colors'
              aria-label={`View full profile of ${staff.name}`}>
              <BookOpen className='w-3.5 h-3.5' />
              View Profile
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ── Staff Modal ───────────────────────────────────────────────────────────────
function StaffModal({
  staff,
  onClose,
}: {
  staff: StaffMember;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      role='dialog'
      aria-modal='true'
      aria-labelledby='staff-modal-title'
      className='fixed inset-0 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center z-50 p-0 sm:p-4'
      onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 280, damping: 26 }}
        id='staff-modal'
        className='bg-card border border-border w-full sm:max-w-lg rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col max-h-[92vh] sm:max-h-[90vh] overflow-hidden'
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}>
        {/* Drag handle (mobile) */}
        <div className='flex justify-center pt-3 pb-1 sm:hidden'>
          <div className='w-10 h-1 rounded-full bg-muted-foreground/30' />
        </div>

        {/* Header */}
        <div className='flex items-center gap-4 px-6 py-5 border-b border-border'>
          <div className='relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0 border border-border bg-muted'>
            <Image
              src={staff.imageUrl || "/default-avatar.png"}
              alt={`Portrait of ${staff.name}`}
              fill
              className='object-cover object-top'
              sizes='56px'
            />
          </div>
          <div className='min-w-0 flex-1'>
            <h2
              id='staff-modal-title'
              className='text-base font-bold text-foreground leading-snug truncate'>
              {staff.name}
            </h2>
            <p className='text-sm text-primary font-medium mt-0.5'>
              {staff.role}
            </p>
            <div className='flex flex-wrap gap-3 mt-1.5'>
              {staff.email && (
                <a
                  href={`mailto:${staff.email}`}
                  className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors truncate'>
                  <Mail className='w-3 h-3 flex-shrink-0' />
                  <span className='truncate'>{staff.email}</span>
                </a>
              )}
              {staff.linkedin && (
                <a
                  href={staff.linkedin}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors'>
                  <Linkedin className='w-3 h-3 flex-shrink-0' />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
          <button
            className='w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-muted/70 transition-colors flex-shrink-0'
            onClick={onClose}
            aria-label='Close profile modal'>
            <X className='w-4 h-4' />
          </button>
        </div>

        {/* Profile content */}
        <div className='overflow-y-auto flex-1 px-6 py-5'>
          <div className='prose dark:prose-invert prose-sm max-w-none'>
            <SafeHTMLRenderer
              htmlContent={staff.profile ?? "No profile available."}
              className='text-foreground'
            />
          </div>
        </div>

        {/* Footer */}
        <div className='flex justify-end px-6 py-4 border-t border-border'>
          <button
            onClick={onClose}
            className='px-5 py-2 text-sm font-semibold rounded-xl border border-border hover:bg-muted transition-colors'>
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function StaffDetail() {
  const staffList = useQuery(api.staff.getStaff);
  const shouldReduceMotion = useReducedMotion();
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Escape key + scroll lock for modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStaff(null);
    };
    if (selectedStaff) {
      document.documentElement.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
      document.getElementById("staff-modal")?.focus();
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedStaff]);

  const isFeatured = useCallback(
    (staff: StaffMember) =>
      staff.name.trim().includes(FEATURED_STAFF.firstName) &&
      staff.name.trim().includes(FEATURED_STAFF.lastName),
    []
  );
  const isRegular = useCallback(
    (staff: StaffMember) => !isFeatured(staff),
    [isFeatured]
  );

  return (
    <div className='min-h-screen bg-background'>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
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
        <div className='relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8'>
          <span className='inline-block mb-4 px-4 py-1.5 rounded-full bg-[#FFDC55]/15 border border-[#FFDC55]/35 text-[#FFDC55] text-sm font-semibold tracking-wide'>
            Our Team
          </span>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight'>
            Administrative Team
          </h1>
          <p className='mt-4 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed'>
            Meet the dedicated professionals shaping the future of postgraduate
            education at Godfrey Okoye University.
          </p>
        </div>
      </section>

      <div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        {/* ── Loading skeleton ─────────────────────────────────────────── */}
        {staffList === undefined ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className='rounded-2xl border border-border overflow-hidden'>
                <Skeleton className='aspect-square w-full' />
                <div className='p-5 space-y-2.5'>
                  <Skeleton className='h-4 w-3/4 mx-auto rounded-lg' />
                  <Skeleton className='h-3 w-1/2 mx-auto rounded-lg' />
                  <Skeleton className='h-8 w-full rounded-lg mt-1' />
                </div>
              </div>
            ))}
          </div>
        ) : staffList.length === 0 ? (
          /* ── Empty state ──────────────────────────────────────────────── */
          <div className='flex flex-col items-center justify-center py-24 text-center gap-3'>
            <div className='w-16 h-16 rounded-2xl bg-muted flex items-center justify-center'>
              <Users className='w-8 h-8 text-muted-foreground/40' />
            </div>
            <p className='text-lg font-semibold text-foreground'>
              No staff members found
            </p>
            <p className='text-sm text-muted-foreground'>Check back later.</p>
          </div>
        ) : (
          <>
            {/* ── Featured Staff ─────────────────────────────────────────── */}
            {staffList.some(isFeatured) && (
              <section className='mb-12' aria-label='Featured staff member'>
                {staffList.filter(isFeatured).map((staff) => (
                  <motion.div
                    key={staff._id}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 20 }
                    }
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className='max-w-2xl mx-auto rounded-2xl border border-border bg-card overflow-hidden shadow-md flex flex-col sm:flex-row'>
                    {/* Photo */}
                    <div className='relative w-full aspect-square sm:w-56 sm:aspect-auto flex-shrink-0'>
                      <Image
                        alt={`Portrait of ${staff.name}`}
                        src={staff.imageUrl || "/default-avatar.png"}
                        fill
                        className='object-cover object-top'
                        sizes='(max-width: 640px) 100vw, 224px'
                        priority
                      />
                    </div>

                    {/* Content */}
                    <div className='flex flex-col justify-center p-6 sm:p-8 text-center sm:text-left flex-1'>
                      <span className='inline-block mb-2 text-xs font-bold tracking-widest text-primary uppercase'>
                        Director
                      </span>
                      <h2 className='font-extrabold text-2xl sm:text-3xl text-foreground leading-tight mb-1'>
                        {staff.name}
                      </h2>
                      <p className='text-primary font-medium mb-5'>
                        {staff.role}
                      </p>
                      <div className='flex flex-wrap gap-4 items-center justify-center sm:justify-start mb-5'>
                        {staff.email && (
                          <a
                            href={`mailto:${staff.email}`}
                            className='flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors'>
                            <Mail className='w-4 h-4' />
                            {staff.email}
                          </a>
                        )}
                        {staff.linkedin && (
                          <a
                            href={staff.linkedin}
                            target='_blank'
                            rel='noopener noreferrer'
                            className='flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors'>
                            <Linkedin className='w-4 h-4' />
                            LinkedIn
                          </a>
                        )}
                      </div>
                      {staff.profile && (
                        <button
                          onClick={() => setSelectedStaff(staff)}
                          className='self-center sm:self-start inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all'
                          aria-label={`View full profile of ${staff.name}`}>
                          <BookOpen className='w-4 h-4' />
                          View Full Profile
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </section>
            )}

            {/* ── Staff Grid ─────────────────────────────────────────────── */}
            {staffList.filter(isRegular).length > 0 && (
              <section aria-label='Staff directory'>
                {staffList.some(isFeatured) && (
                  <div className='flex items-center gap-3 mb-8'>
                    <div className='flex-1 h-px bg-border' />
                    <span className='text-xs font-bold tracking-widest text-muted-foreground uppercase px-3'>
                      Staff Directory
                    </span>
                    <div className='flex-1 h-px bg-border' />
                  </div>
                )}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                  {staffList.filter(isRegular).map((staff, index) => (
                    <StaffCard
                      key={staff._id}
                      staff={staff}
                      index={index}
                      reducedMotion={shouldReduceMotion}
                      onSelect={() => setSelectedStaff(staff)}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>

      {/* ── Modal (portal via AnimatePresence) ───────────────────────────── */}
      <AnimatePresence>
        {selectedStaff && (
          <StaffModal
            staff={selectedStaff}
            onClose={() => setSelectedStaff(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
