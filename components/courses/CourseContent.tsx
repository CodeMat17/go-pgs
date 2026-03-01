"use client";

import { SafeHTMLRenderer } from "@/components/SafeHTMLRenderer";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CheckCircle2,
  ExternalLink,
  GraduationCap,
  Monitor,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

// ── Level colours ──────────────────────────────────────────────────────────
const levelAccent: Record<string, string> = {
  pgd: "bg-blue-500",
  masters: "bg-violet-500",
  phd: "bg-emerald-500",
};
const levelBadge: Record<string, string> = {
  pgd: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  masters:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  phd: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

// ── Loading skeleton ───────────────────────────────────────────────────────
function LoadingSkeleton() {
  return (
    <div className='min-h-screen bg-background'>
      <div className='h-48 bg-muted animate-pulse' />
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid gap-8 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_340px]'>
        <div className='space-y-6'>
          <Skeleton className='h-8 w-3/4 rounded-xl' />
          <Skeleton className='h-48 w-full rounded-2xl' />
          <Skeleton className='h-64 w-full rounded-2xl' />
        </div>
        <div className='space-y-4'>
          <Skeleton className='h-40 w-full rounded-2xl' />
          <Skeleton className='h-32 w-full rounded-2xl' />
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
const CourseContent = () => {
  const params = useParams();
  const shouldReduceMotion = useReducedMotion();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const course = useQuery(
    api.courses.getProgramBySlug,
    slug ? { slug } : "skip"
  );
  const howToApply = useQuery(api.howToApply.getAll);

  // Structured data for SEO
  useEffect(() => {
    if (!course) return;
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Course",
      name: course.course,
      description: course.overview,
      courseMode: course.mode,
      timeRequired: course.duration,
      provider: {
        "@type": "Organization",
        name: "Godfrey Okoye University",
        sameAs: process.env.NEXT_PUBLIC_SITE_URL,
      },
    });
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [course]);

  if (course === undefined) return <LoadingSkeleton />;

  if (course === null) {
    return (
      <div className='min-h-screen bg-background flex flex-col items-center justify-center gap-4 py-32'>
        <GraduationCap className='w-14 h-14 text-muted-foreground/30' />
        <p className='text-xl font-semibold text-foreground'>
          Course not found
        </p>
        <Link
          href='/courses'
          className='text-sm text-primary hover:underline font-medium'>
          ← Back to all courses
        </Link>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-background'>
      {/* ── Course hero ───────────────────────────────────────────────── */}
      <section className='relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80 py-14 sm:py-18 lg:py-20'>
        <div
          className='absolute inset-0 bg-[url("/pattern.png")] opacity-5'
          aria-hidden='true'
        />
        <div
          className='absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#FFDC55]/10 blur-3xl pointer-events-none'
          aria-hidden='true'
        />

        <div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Breadcrumb */}
          <Link
            href='/courses'
            className='inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm font-medium mb-6 transition-colors'>
            <ArrowLeft className='w-4 h-4' />
            All Courses
          </Link>

          {/* Level badge */}
          <div className='mb-3'>
            <span
              className={`inline-block text-[10px] font-bold tracking-wider px-3 py-1 rounded-full ${levelBadge[course.type] ?? "bg-white/20 text-white"}`}>
              {course.type.toUpperCase()}
            </span>
          </div>

          <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight tracking-tight max-w-3xl'>
            {course.course}
          </h1>

          {/* Quick meta strip */}
          <div className='mt-5 flex flex-wrap gap-4 text-sm text-white/70'>
            <div className='flex items-center gap-1.5'>
              <Calendar className='w-4 h-4' />
              {course.duration}
            </div>
            <div className='flex items-center gap-1.5'>
              <Monitor className='w-4 h-4' />
              {course.mode}
            </div>
            <div className='flex items-center gap-1.5'>
              <BookOpen className='w-4 h-4' />
              {course.faculty}
            </div>
          </div>
        </div>
      </section>

      {/* ── Body ──────────────────────────────────────────────────────── */}
      <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14'>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='grid gap-8 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_340px] items-start'>
          {/* ── Main column ─────────────────────────────────────────── */}
          <main className='space-y-6 min-w-0'>
            {/* Why Choose This Course */}
            <div className='rounded-2xl border border-border bg-card p-6 sm:p-8'>
              <h2 className='text-xl sm:text-2xl font-bold text-foreground mb-5 flex items-center gap-2'>
                <span
                  className={`w-1 h-6 rounded-full ${levelAccent[course.type] ?? "bg-primary"}`}
                />
                Why Choose This Course?
              </h2>
              <div className='space-y-4'>
                {course.whyChoose.map((item, i) => (
                  <div key={i} className='flex items-start gap-4'>
                    <div className='w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5'>
                      <span className='text-primary text-sm font-bold'>
                        {i + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className='font-semibold text-foreground text-base mb-0.5'>
                        {item.title}
                      </h3>
                      <p className='text-muted-foreground text-sm leading-relaxed'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Program Overview */}
            <div className='rounded-2xl border border-border bg-card p-6 sm:p-8'>
              <h2 className='text-xl sm:text-2xl font-bold text-foreground mb-5 flex items-center gap-2'>
                <span
                  className={`w-1 h-6 rounded-full ${levelAccent[course.type] ?? "bg-primary"}`}
                />
                Program Overview
              </h2>
              <SafeHTMLRenderer
                htmlContent={course.overview ?? ""}
                className='prose prose-sm sm:prose dark:prose-invert max-w-none text-muted-foreground'
              />
            </div>
          </main>

          {/* ── Sidebar ─────────────────────────────────────────────── */}
          <aside className='space-y-5'>
            {/* How to Apply */}
            {howToApply?.map((apply) => (
              <div
                key={apply._id}
                className='rounded-2xl border border-[#FFDC55]/40 bg-[#FFDC55]/8 dark:bg-[#FFDC55]/5 p-5 sm:p-6'>
                <h2 className='font-bold text-foreground text-base mb-3 uppercase tracking-wide'>
                  How to Apply
                </h2>
                <SafeHTMLRenderer
                  htmlContent={apply.text}
                  className='prose prose-sm dark:prose-invert max-w-none text-muted-foreground mb-5 leading-relaxed'
                />
                <a
                  href={apply.link}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label='Apply now through online form'
                  className='flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 active:scale-[0.98] transition-all duration-200'>
                  Apply Now
                  <ExternalLink className='w-3.5 h-3.5' />
                </a>
              </div>
            ))}

            {/* Key Facts */}
            <div className='rounded-2xl border border-border bg-card p-5 sm:p-6'>
              <h2 className='font-bold text-foreground text-base mb-4 uppercase tracking-wide'>
                Key Facts
              </h2>
              <dl className='space-y-3'>
                {[
                  { Icon: Calendar, label: "Duration", value: course.duration },
                  { Icon: Monitor, label: "Mode", value: course.mode },
                  {
                    Icon: GraduationCap,
                    label: "Award",
                    value: course.type.toUpperCase(),
                  },
                  { Icon: BookOpen, label: "Faculty", value: course.faculty },
                ].map(({ Icon, label, value }) => (
                  <div key={label} className='flex items-start gap-3'>
                    <div className='w-8 h-8 rounded-lg bg-muted flex items-center justify-center flex-shrink-0'>
                      <Icon className='w-4 h-4 text-muted-foreground' />
                    </div>
                    <div>
                      <dt className='text-xs text-muted-foreground font-medium uppercase tracking-wide'>
                        {label}
                      </dt>
                      <dd className='text-sm text-foreground font-medium mt-0.5'>
                        {value}
                      </dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>

            {/* Requirements teaser */}
            <div className='rounded-2xl border border-border bg-card p-5 sm:p-6'>
              <h2 className='font-bold text-foreground text-base mb-3 uppercase tracking-wide'>
                Entry Requirements
              </h2>
              <div className='space-y-2 mb-4'>
                {[
                  "Relevant undergraduate degree",
                  "Minimum 2nd Class Honours",
                  "Official transcripts",
                ].map((req) => (
                  <div key={req} className='flex items-start gap-2 text-sm'>
                    <CheckCircle2 className='w-4 h-4 text-primary flex-shrink-0 mt-0.5' />
                    <span className='text-muted-foreground'>{req}</span>
                  </div>
                ))}
              </div>
              <Link
                href='/requirements'
                className='text-xs font-semibold text-primary hover:underline'>
                View full requirements →
              </Link>
            </div>
          </aside>
        </motion.div>
      </div>
    </div>
  );
};

export default CourseContent;
