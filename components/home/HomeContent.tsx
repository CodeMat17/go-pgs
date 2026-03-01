"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Award, ArrowRight, BookOpen, Globe2, Users2 } from "lucide-react";
import { ApplyNow } from "../buttons/ApplyNow";
import { QuickLinks } from "../QuickLinks";

const DescriptionAnimation = dynamic(() => import("../DescriptionAnimation"), {
  ssr: false,
  loading: () => <div className='h-8' aria-hidden='true' />,
});

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

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <div ref={ref} className='flex flex-col items-center gap-1 py-2'>
      <span className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground'>
        {count.toLocaleString()}
        {suffix}
      </span>
      <span className='text-xs sm:text-sm text-primary-foreground/65 font-medium tracking-wide text-center'>
        {label}
      </span>
    </div>
  );
}

// ── Data ───────────────────────────────────────────────────────────────────
const stats = [
  { label: "Postgraduate Programs", value: 30, suffix: "+" },
  { label: "Years of Excellence", value: 15, suffix: "+" },
  { label: "Graduate Students", value: 2000, suffix: "+" },
  { label: "Research Publications", value: 500, suffix: "+" },
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
    title: "Accredited Programs",
    description:
      "Internationally recognized degrees designed to meet global academic and industry standards.",
  },
  {
    Icon: Users2,
    title: "Vibrant Community",
    description:
      "Join a diverse network of scholars, researchers, and innovators from across Nigeria and beyond.",
  },
  {
    Icon: Globe2,
    title: "Research Impact",
    description:
      "Contribute to groundbreaking research that addresses real-world challenges across Africa.",
  },
];

// ── Main component ─────────────────────────────────────────────────────────
export default function HomeContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className='min-h-screen'>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className='relative w-full min-h-[600px] lg:min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden'>
        {/* Background image */}
        <motion.div
          initial={shouldReduceMotion ? {} : { scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className='absolute inset-0 z-0'>
          <Image
            src='/hero-bg.avif'
            alt='Aerial view of Godfrey Okoye University campus with modern buildings and green spaces'
            fill
            priority
            className='object-cover object-center'
            quality={100}
            sizes='100vw'
            aria-hidden='true'
          />
          {/* Multi-layer gradient for depth */}
          <div className='absolute inset-0 bg-gradient-to-br from-black/75 via-primary/40 to-black/65' />
          <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />
          <div
            className='absolute inset-0 bg-[url("/pattern.png")] opacity-10'
            aria-hidden='true'
          />
        </motion.div>

        {/* Hero content */}
        <div className='relative w-full z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center lg:items-start gap-6 py-16 sm:py-20 lg:py-28'>
          {/* Admission badge */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}>
            <div className='inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFDC55]/15 border border-[#FFDC55]/40 backdrop-blur-sm'>
              <span className='w-2 h-2 rounded-full bg-[#FFDC55] animate-pulse' />
              <span className='text-[#FFDC55] text-sm font-semibold tracking-wide'>
                Admissions Now Open
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='max-w-4xl'>
            <h1 className='text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-extrabold text-white tracking-tight leading-[1.1] [text-shadow:_0_2px_20px_rgba(0,0,0,0.4)]'>
              Elevate Your{" "}
              <span className='text-[#FFDC55]'>Academic Journey</span>
            </h1>
            <h2 className='mt-4 text-xl sm:text-2xl lg:text-3xl font-bold text-white/85 [text-shadow:_0_1px_8px_rgba(0,0,0,0.5)]'>
              Godfrey Okoye University
              <span className='block text-lg sm:text-xl lg:text-2xl mt-1 font-medium text-white/65'>
                School of Postgraduate Studies
              </span>
            </h2>
          </motion.div>

          {/* Typewriter description */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='w-full max-w-2xl backdrop-blur-sm bg-black/5 rounded-xl'>
            <DescriptionAnimation />
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className='flex flex-col sm:flex-row gap-3'>
            <ApplyNow />
            <Link
              href='/about-us'
              className='inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-md border border-white/30 text-white text-sm sm:text-base font-medium backdrop-blur-sm hover:bg-white/10 transition-all duration-200 group'>
              Learn More
              <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </Link>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className='absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1'
          aria-hidden='true'>
          <span className='text-white/40 text-[10px] tracking-[0.2em] uppercase'>
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
            className='w-6 h-10 border-2 border-white/30 rounded-full flex justify-center pt-2'>
            <div className='w-1 h-2 bg-white/60 rounded-full' />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────────────── */}
      <section className='py-10 sm:py-14 bg-primary'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:divide-x lg:divide-primary-foreground/10'>
            {stats.map((stat) => (
              <StatCounter key={stat.label} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why GO-PGS? ───────────────────────────────────────────────── */}
      <section className='py-16 sm:py-20 lg:py-24 bg-background'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Section header */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12 sm:mb-16'>
            <span className='inline-block mb-3 text-xs font-semibold tracking-[0.15em] uppercase text-muted-foreground'>
              Why Choose Us
            </span>
            <h2 className='text-3xl sm:text-4xl font-bold text-foreground'>
              Built for Academic Excellence
            </h2>
            <p className='mt-4 text-muted-foreground max-w-2xl mx-auto text-base sm:text-lg leading-relaxed'>
              A legacy of scholarly rigor, cutting-edge research, and
              transformative education that empowers the next generation of
              African leaders.
            </p>
          </motion.div>

          {/* Feature cards */}
          <div className='grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6'>
            {features.map(({ Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className='group flex flex-col p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default'>
                <div className='w-12 h-12 rounded-xl bg-[#FEDA37]/15 flex items-center justify-center mb-5 group-hover:bg-[#FEDA37]/25 transition-colors'>
                  <Icon
                    className='w-6 h-6 text-[#c4a800] dark:text-[#FEDA37]'
                    aria-hidden='true'
                  />
                </div>
                <h3 className='font-semibold text-lg text-foreground mb-2 leading-snug'>
                  {title}
                </h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Quick Links ───────────────────────────────────────────────── */}
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/80 to-muted'>
        <QuickLinks />
      </motion.section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className='relative py-16 sm:py-20 lg:py-24 overflow-hidden bg-primary'>
        <div
          className='absolute inset-0 bg-[url("/pattern.png")] opacity-5'
          aria-hidden='true'
        />
        {/* Decorative glow blobs */}
        <div
          className='absolute -top-24 -left-24 w-72 h-72 rounded-full bg-[#FFDC55]/10 blur-3xl pointer-events-none'
          aria-hidden='true'
        />
        <div
          className='absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-white/5 blur-3xl pointer-events-none'
          aria-hidden='true'
        />

        <div className='relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight'>
              Ready to Begin Your{" "}
              <span className='text-[#FFDC55]'>Postgraduate Journey?</span>
            </h2>
            <p className='mt-4 text-primary-foreground/70 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed'>
              Join thousands of scholars who have chosen GO-PGS for world-class
              postgraduate education. Your future starts here.
            </p>

            <div className='mt-6 flex flex-col sm:flex-row gap-3 justify-center'>
              <Link
                href='/courses'
                className='inline-flex items-center justify-center gap-2 px-8 py-4 rounded-lg bg-[#FFDC55] text-black font-bold text-sm sm:text-base hover:bg-[#FFDC55]/90 active:scale-[0.98] transition-all duration-200'>
                Explore Programs
                <ArrowRight className='w-4 h-4' />
              </Link>
              <Link
                href='/contact'
                className='inline-flex items-center justify-center px-8 py-4 rounded-lg border border-primary-foreground/25 text-primary-foreground font-semibold text-sm sm:text-base hover:bg-primary-foreground/10 active:scale-[0.98] transition-all duration-200'>
                Contact Admissions
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
