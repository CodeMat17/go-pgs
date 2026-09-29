"use client";

import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { m, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  CheckCircle2,
  Globe,
  HeartHandshake,
  Lightbulb,
  Target,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

// ── Animation variants ─────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.12 } },
};

// ── Data ───────────────────────────────────────────────────────────────────
const whyItems = [
  {
    Icon: Globe,
    title: "Global Recognition",
    description:
      "Our programs are internationally accredited, ensuring your degree is recognized worldwide.",
  },
  {
    Icon: Award,
    title: "Academic Excellence",
    description:
      "Ranked among the top universities in Africa, we offer rigorous, globally competitive curricula.",
  },
  {
    Icon: BookOpen,
    title: "Innovative Learning",
    description:
      "Cutting-edge teaching methods, including blended learning and research-driven programs.",
  },
  {
    Icon: Users,
    title: "Diverse Community",
    description:
      "Join a vibrant community of students and faculty from over 20 countries.",
  },
  {
    Icon: Briefcase,
    title: "Career Readiness",
    description:
      "Strong industry partnerships and career services to prepare you for the global job market.",
  },
  {
    Icon: HeartHandshake,
    title: "Values-Driven Education",
    description:
      "We nurture ethical leaders who are committed to making a positive impact in society.",
  },
];

const globalPoints = [
  "Internationally accredited programs",
  "Collaborations with top global universities",
  "State-of-the-art facilities and resources",
  "Faculty with global expertise and experience",
];

// ── Component ──────────────────────────────────────────────────────────────
export default function AboutUsContent({
  initialMission,
  initialVision,
}: {
  initialMission?: Doc<"mission">[];
  initialVision?: Doc<"vision">[];
}) {
  const shouldReduceMotion = useReducedMotion();
  // Server-rendered data seeds the first paint so the section doesn't pop in and shift the page.
  const ourVision = useQuery(api.vision.getVision) ?? initialVision;
  const ourMission = useQuery(api.mission.getMission) ?? initialMission;

  return (
    <div className='min-h-screen bg-background'>
      {/* ── Page Hero ─────────────────────────────────────────────────── */}
      <section className='hero-brand py-20 sm:py-24 lg:py-32'>
        {/* Decorative blobs */}
        <div
          className='absolute -top-32 -right-32 w-96 h-96 rounded-full bg-gold/10 blur-3xl pointer-events-none'
          aria-hidden='true'
        />
        <div
          className='absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none'
          aria-hidden='true'
        />

        <div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <div className='motion-safe:animate-fade-up'>
            {/* Eyebrow */}
            <span className='inline-flex mb-5 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-extrabold uppercase tracking-[0.16em]'>
              Our Story
            </span>

            <h1 className='text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-extrabold text-white leading-tight tracking-tight'>
              About{" "}
              <span className='text-gold'>Godfrey Okoye University</span>
              <br className='hidden sm:block' />
              <span className='text-2xl sm:text-3xl lg:text-4xl font-semibold text-white/80 mt-2 block'>
                School of Postgraduate Studies
              </span>
            </h1>

            <p className='mt-6 text-base sm:text-lg lg:text-xl text-white/70 max-w-3xl mx-auto leading-relaxed'>
              A world-class institution committed to excellence, innovation, and
              holistic education — shaping tomorrow&apos;s leaders and advancing
              knowledge across Africa and beyond.
            </p>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────────────────── */}
      {(ourMission?.length || ourVision?.length) ? (
        <section className='py-16 sm:py-20 lg:py-24 bg-muted/40'>
          <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
            <m.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='text-center mb-12'>
              <span className='inline-block mb-3 text-xs font-extrabold tracking-[0.18em] uppercase text-brand-600 dark:text-gold'>
                What Drives Us
              </span>
              <h2 className='text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground'>
                Our Mission &amp; Vision
              </h2>
            </m.div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {ourMission?.map((mission) => (
                <m.div
                  key={mission._id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className='relative flex flex-col gap-4 p-6 sm:p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 overflow-hidden group'>
                  {/* Accent bar */}
                  <div className='absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-l-2xl' />
                  <div className='w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0'>
                    <Target
                      className='w-5 h-5 text-primary'
                      aria-hidden='true'
                    />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-foreground mb-3'>
                      {mission.title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed text-sm sm:text-base'>
                      {mission.desc}
                    </p>
                  </div>
                </m.div>
              ))}

              {ourVision?.map((vision) => (
                <m.div
                  key={vision._id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className='relative flex flex-col gap-4 p-6 sm:p-8 rounded-2xl bg-card border border-border hover:shadow-lg transition-all duration-300 overflow-hidden group'>
                  <div className='absolute left-0 top-0 bottom-0 w-1 bg-gold-700 dark:bg-gold rounded-l-2xl' />
                  <div className='w-11 h-11 rounded-xl bg-gold/15 flex items-center justify-center flex-shrink-0'>
                    <Lightbulb
                      className='w-5 h-5 text-gold-700 dark:text-gold'
                      aria-hidden='true'
                    />
                  </div>
                  <div>
                    <h3 className='text-xl font-bold text-foreground mb-3'>
                      {vision.title}
                    </h3>
                    <p className='text-muted-foreground leading-relaxed text-sm sm:text-base'>
                      {vision.desc}
                    </p>
                  </div>
                </m.div>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* ── Why Choose GO University ───────────────────────────────────── */}
      <section className='py-16 sm:py-20 lg:py-24 bg-background'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Section header */}
          <m.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12 sm:mb-16'>
            <span className='inline-block mb-3 text-xs font-extrabold tracking-[0.18em] uppercase text-brand-600 dark:text-gold'>
              Our Strengths
            </span>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground'>
              Why Choose GO University?
            </h2>
            <p className='mt-4 text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed'>
              We provide a transformative environment where curiosity meets
              opportunity, and scholarship drives change.
            </p>
          </m.div>

          {/* Cards */}
          <m.div
            variants={stagger}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: "-50px" }}
            className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6'>
            {whyItems.map(({ Icon, title, description }) => (
              <m.div
                key={title}
                variants={fadeUp}
                transition={{ duration: 0.45 }}
                className='group flex flex-col p-6 rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-default'>
                <div className='w-12 h-12 rounded-xl bg-primary/8 dark:bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/15 transition-colors flex-shrink-0'>
                  <Icon
                    className='w-6 h-6 text-primary'
                    aria-hidden='true'
                  />
                </div>
                <h3 className='font-semibold text-base sm:text-lg text-foreground mb-2 leading-snug'>
                  {title}
                </h3>
                <p className='text-muted-foreground text-sm leading-relaxed'>
                  {description}
                </p>
              </m.div>
            ))}
          </m.div>
        </div>
      </section>

      {/* ── Global Standards, Local Impact ────────────────────────────── */}
      <section className='py-16 sm:py-20 lg:py-24 bg-muted/40'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <m.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className='text-center mb-12 sm:mb-16'>
            <span className='inline-block mb-3 text-xs font-extrabold tracking-[0.18em] uppercase text-brand-600 dark:text-gold'>
              Our Reach
            </span>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight text-foreground'>
              Global Standards, Local Impact
            </h2>
          </m.div>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-center'>
            {/* Text side */}
            <m.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className='space-y-6'>
              <p className='text-muted-foreground leading-relaxed text-sm sm:text-base lg:text-lg'>
                At GO University, we combine global best practices with local
                relevance. Our programs are designed to meet international
                standards while addressing the unique challenges and
                opportunities of our region.
              </p>
              <ul className='space-y-3'>
                {globalPoints.map((point) => (
                  <li key={point} className='flex items-start gap-3'>
                    <CheckCircle2
                      className='w-5 h-5 text-primary flex-shrink-0 mt-0.5'
                      aria-hidden='true'
                    />
                    <span className='text-foreground text-sm sm:text-base'>
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </m.div>

            {/* Image side */}
            <m.div
              initial={shouldReduceMotion ? false : { opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className='relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]'>
              <Image
                src='/about_us_img.avif'
                alt='Diverse group of postgraduate students collaborating in modern campus facilities'
                fill
                quality={90}
                className='object-cover hover:scale-105 transition-transform duration-700'
                sizes='(max-width: 768px) 100vw, 50vw'
              />
              {/* Image overlay gradient */}
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none' />
            </m.div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ────────────────────────────────────────────────── */}
      <section className='hero-brand py-16 sm:py-20 lg:py-24'>
        <div
          className='absolute -top-24 -right-24 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none'
          aria-hidden='true'
        />
        <div
          className='absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none'
          aria-hidden='true'
        />

        <div className='relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center'>
          <m.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}>
            <h2 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight'>
              Ready to{" "}
              <span className='text-gold'>Join Us?</span>
            </h2>
            <p className='mt-4 text-white/70 text-base sm:text-lg max-w-xl mx-auto leading-relaxed'>
              Take the first step toward a transformative educational experience.
              Your journey to excellence begins here.
            </p>

            <div className='mt-8 flex flex-col sm:flex-row gap-3 justify-center'>
              <Link
                href='/courses'
                className='btn-gold'>
                Explore Programs
                <ArrowRight className='w-4 h-4' />
              </Link>
              <Link
                href='/contact'
                className='btn-ghost-light'>
                Contact Admissions
              </Link>
            </div>
          </m.div>
        </div>
      </section>
    </div>
  );
}
