"use client";

import { SectionHeading } from "@/components/PageHero";
import { api } from "@/convex/_generated/api";
import { FunctionReturnType } from "convex/server";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import { m, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Calendar,
  ClipboardCheck,
  FileText,
  Globe2,
  GraduationCap,
  Newspaper,
  Search,
  Users2,
} from "lucide-react";
import { liveAssetUrl } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

// ── Animated stat counter ──────────────────────────────────────────────────
function StatCounter({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isInView) return;
    if (shouldReduceMotion) {
      setCount(value);
      return;
    }
    const duration = 1800;
    let startTime: number | null = null;
    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value, shouldReduceMotion]);

  return (
    <div ref={ref} className='flex flex-col items-center gap-1 px-2 py-6 text-center sm:py-8'>
      <span className='text-3xl font-black tracking-tight text-foreground sm:text-5xl'>
        {count.toLocaleString()}
        <span className='text-gold-600 dark:text-gold'>{suffix}</span>
      </span>
      <span className='text-xs font-bold uppercase tracking-[0.12em] text-muted-foreground sm:text-sm'>
        {label}
      </span>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const stats = [
  { label: "Years of Excellence", value: 10, suffix: "+" },
  { label: "Graduate Students", value: 400, suffix: "+" },
  { label: "Research Publications", value: 200, suffix: "+" },
];

const features = [
  {
    Icon: BookOpen,
    title: "World-Class Faculty",
    description:
      "Learn from distinguished professors and industry experts committed to your academic success.",
  },
  {
    Icon: Award,
    title: "Accredited Programmes",
    description:
      "Recognised degrees designed to meet global academic and industry standards.",
  },
  {
    Icon: Users2,
    title: "Vibrant Community",
    description:
      "Join a diverse network of scholars, researchers and innovators from across Nigeria and beyond.",
  },
  {
    Icon: Globe2,
    title: "Research Impact",
    description:
      "Contribute to research that addresses real-world challenges across Africa.",
  },
];

const programs = [
  {
    level: "PGD",
    title: "Postgraduate Diploma",
    description:
      "An intensive programme for professionals seeking advanced specialisation before a Masters degree.",
  },
  {
    level: "M.Sc · M.Ed",
    title: "Masters Degree",
    description:
      "Research and coursework programmes that deepen expertise and open pathways to doctoral study.",
    featured: true,
  },
  {
    level: "Ph.D",
    title: "Doctor of Philosophy",
    description:
      "Rigorous doctoral research that advances knowledge and positions you among Nigeria's academic elite.",
  },
];

const steps = [
  {
    Icon: Search,
    title: "Choose a programme",
    description: "Browse PGD, Masters and PhD courses across every faculty.",
    href: "/courses",
    cta: "Browse courses",
  },
  {
    Icon: ClipboardCheck,
    title: "Check requirements",
    description: "Confirm eligibility and gather the documents you'll need.",
    href: "/requirements",
    cta: "View requirements",
  },
  {
    Icon: FileText,
    title: "Submit your application",
    description: "Complete the application and reach admissions with any questions.",
    href: "/contact",
    cta: "Contact admissions",
  },
];

// ── Main component ─────────────────────────────────────────────────────────
export default function HomeContent({
  initialNews,
}: {
  initialNews?: FunctionReturnType<typeof api.news.getNewsList>;
}) {
  const shouldReduceMotion = useReducedMotion();
  const newsList = useQuery(api.news.getNewsList) ?? initialNews;
  const recentNews = newsList?.slice(0, 4) ?? [];
  const [featuredNews, ...otherNews] = recentNews;

  const fadeUp = (delay = 0) => ({
    initial: shouldReduceMotion ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-60px" },
    transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <div className='overflow-x-clip'>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className='relative isolate overflow-hidden bg-brand-950 text-white'>
        <div className='absolute inset-0 -z-10 bg-gradient-to-br from-brand-900 via-brand-950 to-[#0b0822]' aria-hidden='true' />
        {/* Faint campus photo: desaturated and tinted so it reads as atmosphere, not content */}
        <div
          className='absolute inset-0 -z-10 motion-safe:animate-hero-zoom'
          aria-hidden='true'>
          <Image
            src='/hero-bg.avif'
            alt=''
            fill
            priority
            sizes='100vw'
            className='object-cover object-center opacity-[0.7] mix-blend-luminosity'
          />
          {/* Even veil with a soft vignette so the centred copy stays legible */}
          <div className='absolute inset-0 bg-brand-950/55' />
          <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(11,8,34,0.55)_70%)]' />
          <div className='absolute inset-0 bg-gradient-to-t from-brand-950 via-transparent to-brand-950/40' />
        </div>
        <div className='absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-30' aria-hidden='true' />
        <div className='absolute left-1/2 top-1/3 -z-10 h-[32rem] w-[48rem] max-w-full -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-500/20 blur-3xl' aria-hidden='true' />
        <div className='absolute -right-32 -top-32 -z-10 h-[26rem] w-[26rem] rounded-full bg-gold/10 blur-3xl' aria-hidden='true' />
        <div className='absolute -left-32 bottom-0 -z-10 h-[22rem] w-[22rem] rounded-full bg-gold/[0.07] blur-3xl' aria-hidden='true' />

        <div className='container-page flex flex-col items-center justify-center pb-32 pt-16 text-center sm:pt-24 lg:min-h-[min(calc(100vh-72px),820px)] lg:pb-40 lg:pt-16'>
          <div
            className='motion-safe:animate-fade-in inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 py-1.5 pl-2 pr-4 backdrop-blur'>
            <span className='relative flex h-2 w-2'>
              <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60' />
              <span className='relative inline-flex h-2 w-2 rounded-full bg-gold' />
            </span>
            <span className='text-xs font-extrabold uppercase tracking-[0.16em] text-gold'>
              Admissions now open
            </span>
          </div>

          <p className='motion-safe:animate-fade-up mt-8 text-xs font-bold uppercase tracking-[0.32em] text-white/50 sm:text-sm'>
            School of Postgraduate Studies
          </p>

          <h1
            className='motion-safe:animate-fade-up mt-5 max-w-5xl text-balance text-[2.75rem] font-black leading-[1.02] tracking-tight sm:text-7xl xl:text-8xl'>
            Elevate your{" "}
            <span className='relative whitespace-nowrap text-gold'>
              academic
              <svg
                aria-hidden='true'
                viewBox='0 0 300 20'
                preserveAspectRatio='none'
                className='absolute -bottom-2 left-0 h-3 w-full text-gold/60'>
                <path d='M2 15 C 80 3, 220 3, 298 13' fill='none' stroke='currentColor' strokeWidth='4' strokeLinecap='round' />
              </svg>
            </span>{" "}
            journey.
          </h1>

          {/* Ornamental divider */}
          <div className='motion-safe:animate-fade-in [animation-delay:100ms] mt-10 flex items-center gap-4' aria-hidden='true'>
            <span className='h-px w-12 bg-gradient-to-r from-transparent to-gold/60 sm:w-20' />
            <span className='h-1.5 w-1.5 rotate-45 bg-gold' />
            <span className='h-px w-12 bg-gradient-to-l from-transparent to-gold/60 sm:w-20' />
          </div>

          <p
            className='motion-safe:animate-fade-up [animation-delay:120ms] mt-8 max-w-2xl text-pretty text-base leading-relaxed text-white/70 sm:text-lg lg:text-xl'>
            The School of Postgraduate Studies at{" "}
            <span className='font-bold text-white'>Godfrey Okoye University</span>{" "}
            offers accredited PGD, Masters and PhD programmes, taught by
            scholars who are shaping research across Africa.
          </p>

          <div
            className='motion-safe:animate-fade-up [animation-delay:240ms] mt-10 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row'>
            <Link href='/courses' className='btn-gold group'>
              Explore programmes
              <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
            </Link>
            <Link href='/requirements' className='btn-ghost-light'>
              How to apply
            </Link>
          </div>

          <div
            className='motion-safe:animate-fade-in [animation-delay:400ms] mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-white/10 pt-8 text-sm font-semibold text-white/55'>
            <span className='flex items-center gap-2'>
              <Award className='h-4 w-4 text-gold' /> NUC-accredited
            </span>
            <span className='hidden h-4 w-px bg-white/15 sm:block' aria-hidden='true' />
            <span className='flex items-center gap-2'>
              <GraduationCap className='h-4 w-4 text-gold' /> PGD · Masters · PhD
            </span>
            <span className='hidden h-4 w-px bg-white/15 sm:block' aria-hidden='true' />
            <span className='flex items-center gap-2'>
              <Globe2 className='h-4 w-4 text-gold' /> Enugu, Nigeria
            </span>
          </div>
        </div>
      </section>

      {/* ── Stats (overlapping hero) ──────────────────────────────────────── */}
      <section className='relative z-10 -mt-16 sm:-mt-20'>
        <div className='container-page'>
          <div className='grid grid-cols-3 divide-x divide-border rounded-3xl border border-border/70 bg-card shadow-lift'>
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why GO-PGS ────────────────────────────────────────────────────── */}
      <section className='py-20 sm:py-24 lg:py-28'>
        <div className='container-page grid gap-12 lg:grid-cols-12 lg:gap-16'>
          <m.div {...fadeUp()} className='lg:col-span-5 lg:pt-4'>
            <SectionHeading
              align='left'
              eyebrow='Why choose us'
              title={
                <>
                  Built for scholars who want to{" "}
                  <span className='text-brand-600 dark:text-gold'>lead</span>.
                </>
              }
              description='Scholarly rigour, strong research and teaching that changes careers, preparing the next generation of African leaders.'
            />
            <Link
              href='/about-us'
              className='mt-8 inline-flex items-center gap-2 text-sm font-extrabold text-brand-700 transition-colors hover:text-brand-900 dark:text-gold dark:hover:text-gold-300'>
              Discover our story <ArrowRight className='h-4 w-4' />
            </Link>
          </m.div>

          <div className='grid gap-5 sm:grid-cols-2 lg:col-span-7'>
            {features.map(({ Icon, title, description }, i) => (
              <m.div
                key={title}
                {...fadeUp(i * 0.08)}
                className='surface surface-hover group p-7'>
                <div className='mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 transition-colors group-hover:bg-gold group-hover:text-brand-950 group-hover:ring-gold dark:bg-white/5 dark:text-gold dark:ring-white/10'>
                  <Icon className='h-6 w-6' aria-hidden='true' />
                </div>
                <h3 className='mb-2 text-lg font-extrabold text-foreground'>{title}</h3>
                <p className='text-sm leading-relaxed text-muted-foreground'>{description}</p>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Programmes ────────────────────────────────────────────────────── */}
      <section className='relative bg-secondary/60 py-20 dark:bg-card/40 sm:py-24 lg:py-28'>
        <div className='absolute inset-0 bg-dots opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent)]' aria-hidden='true' />
        <div className='container-page relative'>
          <m.div {...fadeUp()}>
            <SectionHeading
              eyebrow='Our programmes'
              title='Find the path that fits your ambition'
              description='Three levels of postgraduate study, each designed around where you want your career to go next.'
            />
          </m.div>

          <div className='mt-14 grid gap-6 md:grid-cols-3'>
            {programs.map(({ level, title, description, featured }, i) => (
              <m.div key={title} {...fadeUp(i * 0.1)}>
                <Link
                  href='/courses'
                  className={
                    featured
                      ? "group relative flex h-full flex-col overflow-hidden rounded-3xl bg-brand-900 p-8 text-white shadow-lift transition-transform duration-300 hover:-translate-y-1 md:-my-4 md:py-12"
                      : "surface surface-hover group relative flex h-full flex-col rounded-3xl p-8"
                  }>
                  {featured && (
                    <>
                      <div className='absolute -right-16 -top-16 h-48 w-48 rounded-full bg-gold/20 blur-3xl' aria-hidden='true' />
                    </>
                  )}
                  <div
                    className={
                      featured
                        ? "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-gold ring-1 ring-white/15"
                        : "mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-700 ring-1 ring-brand-100 dark:bg-white/5 dark:text-gold dark:ring-white/10"
                    }>
                    <GraduationCap className='h-7 w-7' />
                  </div>
                  <span
                    className={
                      featured
                        ? "text-xs font-extrabold uppercase tracking-[0.16em] text-gold"
                        : "text-xs font-extrabold uppercase tracking-[0.16em] text-brand-600 dark:text-gold"
                    }>
                    {level}
                  </span>
                  <h3 className='mt-2 text-2xl font-black'>{title}</h3>
                  <p className={featured ? "mt-3 text-sm leading-relaxed text-white/70" : "mt-3 text-sm leading-relaxed text-muted-foreground"}>
                    {description}
                  </p>
                  <div
                    className={
                      featured
                        ? "mt-8 flex items-center justify-between border-t border-white/10 pt-5"
                        : "mt-8 flex items-center justify-between border-t border-border pt-5"
                    }>
                    <span className={featured ? "flex items-center gap-2 text-sm font-bold text-white/80" : "flex items-center gap-2 text-sm font-bold text-muted-foreground"}>
                      View courses
                    </span>
                    <span
                      className={
                        featured
                          ? "flex h-10 w-10 items-center justify-center rounded-full bg-gold text-brand-950 transition-transform group-hover:rotate-45"
                          : "flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-foreground transition-all group-hover:rotate-45 group-hover:bg-brand-800 group-hover:text-white dark:group-hover:bg-gold dark:group-hover:text-brand-950"
                      }>
                      <ArrowUpRight className='h-5 w-5' />
                    </span>
                  </div>
                </Link>
              </m.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Campus panorama (image in its native 5:2 frame) ───────────────── */}
      <section className='py-20 sm:py-24'>
        <div className='container-page'>
          <m.div
            {...fadeUp()}
            className='relative isolate overflow-hidden rounded-[2rem] bg-brand-950 shadow-lift'>
            <div className='relative aspect-[4/5] sm:aspect-[16/9] lg:aspect-[5/2]'>
              <Image
                src='/hero-bg.avif'
                alt='Aerial view of Godfrey Okoye University campus'
                fill
                sizes='(max-width: 1280px) 100vw, 1280px'
                className='object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/50 to-transparent lg:bg-gradient-to-r lg:from-brand-950/95 lg:via-brand-950/60 lg:to-transparent' />
            </div>
            <div className='absolute inset-0 flex items-end p-7 sm:p-10 lg:items-center lg:p-16'>
              <div className='max-w-lg text-white'>
                <span className='text-xs font-extrabold uppercase tracking-[0.18em] text-gold'>
                  Unity of Knowledge
                </span>
                <h2 className='mt-3 text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl'>
                  A campus designed for deep thinking.
                </h2>
                <p className='mt-4 text-sm leading-relaxed text-white/75 sm:text-base'>
                  Study in a calm, focused environment in the heart of Enugu,
                  with the libraries, labs and mentorship serious research needs.
                </p>
                <Link href='/campus-community' className='btn-ghost-light mt-7'>
                  Explore campus life <ArrowRight className='h-4 w-4' />
                </Link>
              </div>
            </div>
          </m.div>
        </div>
      </section>

      {/* ── How to apply ──────────────────────────────────────────────────── */}
      <section className='pb-20 sm:pb-24 lg:pb-28'>
        <div className='container-page'>
          <m.div {...fadeUp()}>
            <SectionHeading
              eyebrow='Admissions'
              title='Three steps to your postgraduate place'
              description='A clear, guided process from first click to acceptance.'
            />
          </m.div>

          <ol className='relative mt-14 grid gap-6 md:grid-cols-3'>
            <div className='absolute left-[16%] right-[16%] top-8 hidden h-px bg-gradient-to-r from-transparent via-border to-transparent md:block' aria-hidden='true' />
            {steps.map(({ Icon, title, description, href, cta }, i) => (
              <m.li key={title} {...fadeUp(i * 0.1)} className='relative text-center'>
                <div className='relative mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-card text-brand-700 shadow-soft ring-1 ring-border dark:text-gold'>
                  <Icon className='h-7 w-7' />
                  <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-gold text-[11px] font-black text-brand-950'>
                    {i + 1}
                  </span>
                </div>
                <h3 className='text-lg font-extrabold text-foreground'>{title}</h3>
                <p className='mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground'>
                  {description}
                </p>
                <Link
                  href={href}
                  className='mt-4 inline-flex items-center gap-1.5 text-sm font-extrabold text-brand-700 hover:underline dark:text-gold'>
                  {cta} <ArrowRight className='h-4 w-4' />
                </Link>
              </m.li>
            ))}
          </ol>
        </div>
      </section>

      {/* ── Latest News ───────────────────────────────────────────────────── */}
      <section className='border-t border-border/60 bg-secondary/40 py-20 dark:bg-card/30 sm:py-24 lg:py-28'>
        <div className='container-page'>
          <m.div
            {...fadeUp()}
            className='mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end'>
            <SectionHeading
              align='left'
              eyebrow='Latest updates'
              title='News & engagements'
            />
            <Link
              href='/news'
              className='inline-flex shrink-0 items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-extrabold text-foreground transition-colors hover:border-brand-300 dark:hover:border-gold/40'>
              View all news <ArrowRight className='h-4 w-4' />
            </Link>
          </m.div>

          {newsList === undefined ? (
            <div className='grid gap-6 lg:grid-cols-2'>
              <div className='aspect-[4/3] animate-pulse rounded-3xl bg-muted' />
              <div className='space-y-4'>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className='flex gap-4 rounded-2xl bg-card p-3'>
                    <div className='h-24 w-32 shrink-0 animate-pulse rounded-xl bg-muted' />
                    <div className='flex-1 space-y-2 py-2'>
                      <div className='h-4 w-3/4 animate-pulse rounded bg-muted' />
                      <div className='h-3 w-1/3 animate-pulse rounded bg-muted' />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : featuredNews ? (
            <div className='grid gap-6 lg:grid-cols-2'>
              {/* Featured */}
              <m.div {...fadeUp()}>
                <Link
                  href={`/news/${featuredNews.slug}`}
                  className='group relative block aspect-[4/3] overflow-hidden rounded-3xl bg-brand-900 shadow-lift'>
                  {liveAssetUrl(featuredNews.coverImage) ? (
                    <Image
                      src={liveAssetUrl(featuredNews.coverImage)!}
                      alt={featuredNews.title}
                      fill
                      sizes='(max-width:1024px) 100vw, 50vw'
                      className='object-cover transition-transform duration-700 group-hover:scale-105'
                    />
                  ) : (
                    <div className='absolute inset-0 flex items-center justify-center'>
                      <Newspaper className='h-12 w-12 text-white/20' />
                    </div>
                  )}
                  <div className='absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/40 to-transparent' />
                  <div className='absolute inset-x-0 bottom-0 p-6 sm:p-8'>
                    <span className='rounded-full bg-gold px-3 py-1 text-[10px] font-black uppercase tracking-widest text-brand-950'>
                      Featured
                    </span>
                    <h3 className='mt-4 line-clamp-3 text-xl font-black leading-snug text-white sm:text-2xl'>
                      {featuredNews.title}
                    </h3>
                    <p className='mt-3 text-xs font-semibold text-white/65'>
                      {featuredNews.author} · {dayjs(featuredNews._creationTime).format("MMM D, YYYY")}
                    </p>
                  </div>
                </Link>
              </m.div>

              {/* List */}
              <div className='flex flex-col gap-4'>
                {otherNews.map(({ _id, title, slug, coverImage, author, _creationTime }, i) => (
                  <m.div key={_id} {...fadeUp(i * 0.08)}>
                    <Link
                      href={`/news/${slug}`}
                      className='surface group flex items-center gap-4 p-3 hover:border-brand-200 hover:shadow-lift dark:hover:border-gold/30 sm:gap-5'>
                      <div className='relative h-24 w-28 shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-40'>
                        {liveAssetUrl(coverImage) ? (
                          <Image
                            src={liveAssetUrl(coverImage)!}
                            alt={title}
                            fill
                            sizes='160px'
                            className='object-cover transition-transform duration-500 group-hover:scale-105'
                          />
                        ) : (
                          <div className='absolute inset-0 flex items-center justify-center'>
                            <Newspaper className='h-6 w-6 text-muted-foreground/40' />
                          </div>
                        )}
                      </div>
                      <div className='min-w-0 flex-1 pr-2'>
                        <p className='mb-1.5 flex items-center gap-1.5 text-xs font-bold text-muted-foreground'>
                          <Calendar className='h-3.5 w-3.5' />
                          {dayjs(_creationTime).format("MMM D, YYYY")}
                        </p>
                        <h3 className='line-clamp-2 font-extrabold leading-snug text-foreground transition-colors group-hover:text-brand-700 dark:group-hover:text-gold'>
                          {title}
                        </h3>
                        <p className='mt-1.5 truncate text-xs text-muted-foreground'>{author}</p>
                      </div>
                      <ArrowUpRight className='hidden h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:text-foreground sm:block' />
                    </Link>
                  </m.div>
                ))}
              </div>
            </div>
          ) : (
            <p className='rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground'>
              No news yet. Check back soon.
            </p>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────────── */}
      <section className='py-20 sm:py-24'>
        <div className='container-page'>
          <m.div
            {...fadeUp()}
            className='relative isolate overflow-hidden rounded-[2rem] bg-brand-900 px-6 py-16 text-center text-white shadow-lift sm:px-12 sm:py-20'>
            <div className='absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-50' aria-hidden='true' />
            <div className='absolute -left-24 -top-24 -z-10 h-72 w-72 rounded-full bg-gold/25 blur-3xl' aria-hidden='true' />
            <div className='absolute -bottom-24 -right-24 -z-10 h-72 w-72 rounded-full bg-brand-500/40 blur-3xl' aria-hidden='true' />
            <h2 className='mx-auto max-w-3xl text-balance text-3xl font-black leading-tight sm:text-4xl lg:text-5xl'>
              Ready to begin your <span className='text-gold'>postgraduate journey?</span>
            </h2>
            <p className='mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/70 sm:text-lg'>
              Join hundreds of scholars who chose GO-PGS for world-class
              postgraduate education. Your future starts here.
            </p>
            <div className='mt-9 flex flex-col justify-center gap-3 sm:flex-row'>
              <Link href='/courses' className='btn-gold group'>
                Explore programmes
                <ArrowRight className='h-4 w-4 transition-transform group-hover:translate-x-1' />
              </Link>
              <Link href='/contact' className='btn-ghost-light'>
                Contact admissions
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </div>
  );
}
