"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Database,
  FlaskConical,
  Globe,
  Leaf,
  Mail,
  Users,
} from "lucide-react";
import Link from "next/link";

// ── Data ─────────────────────────────────────────────────────────────────────
const highlights = [
  {
    icon: FlaskConical,
    title: "Cutting-Edge Facilities",
    description:
      "State-of-the-art laboratories and research centres equipped with advanced technology for groundbreaking discoveries.",
    accent: {
      bar: "bg-blue-500",
      iconBg: "bg-blue-50 dark:bg-blue-900/30",
      icon: "text-blue-500",
    },
  },
  {
    icon: Award,
    title: "Global Recognition",
    description:
      "Our research is published in top-tier international journals and recognised by leading academic bodies worldwide.",
    accent: {
      bar: "bg-amber-500",
      iconBg: "bg-amber-50 dark:bg-amber-900/30",
      icon: "text-amber-500",
    },
  },
  {
    icon: Users,
    title: "Collaborative Environment",
    description:
      "Work alongside leading researchers and industry partners from across Nigeria and around the globe.",
    accent: {
      bar: "bg-violet-500",
      iconBg: "bg-violet-50 dark:bg-violet-900/30",
      icon: "text-violet-500",
    },
  },
  {
    icon: BookOpen,
    title: "Interdisciplinary Research",
    description:
      "Collaborate across disciplines to tackle complex global challenges with innovative, cross-cutting solutions.",
    accent: {
      bar: "bg-emerald-500",
      iconBg: "bg-emerald-50 dark:bg-emerald-900/30",
      icon: "text-emerald-500",
    },
  },
  {
    icon: Globe,
    title: "Global Impact",
    description:
      "Our research addresses critical issues in health, environment, and technology with measurable real-world impact.",
    accent: {
      bar: "bg-cyan-500",
      iconBg: "bg-cyan-50 dark:bg-cyan-900/30",
      icon: "text-cyan-500",
    },
  },
  {
    icon: Briefcase,
    title: "Industry Partnerships",
    description:
      "Strong ties with industry leaders help translate research findings into practical, real-world solutions.",
    accent: {
      bar: "bg-rose-500",
      iconBg: "bg-rose-50 dark:bg-rose-900/30",
      icon: "text-rose-500",
    },
  },
];

const researchAreas = [
  "Biotechnology & Genetic Engineering",
  "Environmental Sustainability",
  "Artificial Intelligence & Data Science",
  "Public Health & Epidemiology",
  "Renewable Energy Systems",
  "Social Sciences & Policy Research",
  "Nanotechnology & Materials Science",
  "Education & Learning Technologies",
];

const facilities = [
  {
    icon: FlaskConical,
    name: "Advanced Biotech Lab",
    description:
      "Equipped with PCR machines, spectrophotometers, and cell culture facilities for cutting-edge biological research.",
  },
  {
    icon: Database,
    name: "Data Science Centre",
    description:
      "High-performance computing resources for AI, machine learning, and big data research initiatives.",
  },
  {
    icon: Leaf,
    name: "Environmental Research Lab",
    description:
      "Specialised facilities for studying climate change, environmental pollution, and renewable energy systems.",
  },
];

const stats = [
  { value: "500+", label: "Publications" },
  { value: "50+", label: "Active Projects" },
  { value: "20+", label: "Research Centres" },
  { value: "15+", label: "Industry Partners" },
];

// ── Component ─────────────────────────────────────────────────────────────────
export default function ResearchContent() {
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

        <div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <span className='inline-block mb-4 px-4 py-1.5 rounded-full bg-[#FFDC55]/15 border border-[#FFDC55]/35 text-[#FFDC55] text-sm font-semibold tracking-wide'>
            Research &amp; Innovation
          </span>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight'>
            Research at GO University
          </h1>
          <p className='mt-4 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed'>
            Advancing knowledge through innovative research and meaningful
            collaboration. Join us in solving global challenges and shaping the
            future of academia and industry.
          </p>
        </div>
      </section>

      {/* ── Stats Strip ─────────────────────────────────────────────────── */}
      <section className='border-b border-border bg-card'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border'>
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className='flex flex-col items-center justify-center py-7 px-4 text-center'>
                <span className='text-3xl font-extrabold text-primary leading-none'>
                  {stat.value}
                </span>
                <span className='mt-1 text-xs text-muted-foreground font-medium tracking-wide uppercase'>
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research Highlights ─────────────────────────────────────────── */}
      <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='mb-10'>
          <h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
            Research Highlights
          </h2>
          <p className='mt-2 text-muted-foreground text-sm'>
            What makes our research environment exceptional.
          </p>
        </div>
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {highlights.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className='flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                <div className={`h-1 w-full ${item.accent.bar}`} />
                <div className='flex flex-col flex-1 p-6'>
                  <div
                    className={`w-10 h-10 rounded-xl ${item.accent.iconBg} flex items-center justify-center mb-4`}>
                    <Icon
                      className={`w-5 h-5 ${item.accent.icon}`}
                      aria-hidden='true'
                    />
                  </div>
                  <h3 className='font-semibold text-foreground mb-2'>
                    {item.title}
                  </h3>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Research Areas ──────────────────────────────────────────────── */}
      <section className='bg-muted/40 border-y border-border'>
        <div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
          <div className='mb-10'>
            <h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
              Our Research Areas
            </h2>
            <p className='mt-2 text-muted-foreground text-sm'>
              Exploring the frontiers of knowledge across diverse disciplines.
            </p>
          </div>
          <div className='grid sm:grid-cols-2 gap-4'>
            {researchAreas.map((area, index) => (
              <motion.div
                key={area}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className='flex items-center gap-4 rounded-xl bg-card border border-border px-5 py-4 hover:shadow-sm transition-shadow duration-200'>
                <span className='w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 text-xs font-bold text-primary'>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className='text-sm font-medium text-foreground'>
                  {area}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Research Facilities ─────────────────────────────────────────── */}
      <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <div className='mb-10'>
          <h2 className='text-2xl sm:text-3xl font-bold text-foreground'>
            Research Facilities
          </h2>
          <p className='mt-2 text-muted-foreground text-sm'>
            World-class infrastructure to power your research ambitions.
          </p>
        </div>
        <div className='grid sm:grid-cols-3 gap-6'>
          {facilities.map((facility, index) => {
            const Icon = facility.icon;
            return (
              <motion.div
                key={facility.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className='rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                <div className='h-1 w-full bg-primary' />
                <div className='p-6'>
                  <div className='w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4'>
                    <Icon
                      className='w-5 h-5 text-primary'
                      aria-hidden='true'
                    />
                  </div>
                  <h3 className='font-semibold text-foreground mb-2'>
                    {facility.name}
                  </h3>
                  <p className='text-sm text-muted-foreground leading-relaxed'>
                    {facility.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────────────────────── */}
      <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className='rounded-3xl bg-gradient-to-br from-primary dark:from-slate-700 to-primary/80 p-8 sm:p-12 text-center relative overflow-hidden'>
          <div
            className='absolute inset-0 bg-[url("/pattern.png")] opacity-5'
            aria-hidden='true'
          />
          <div className='relative'>
            <h2 className='text-2xl sm:text-3xl font-extrabold text-white mb-3'>
              Join Our Research Community
            </h2>
            <p className='text-white/75 text-base max-w-xl mx-auto mb-8 leading-relaxed'>
              Explore opportunities to collaborate, innovate, and make a lasting
              global impact through world-class postgraduate research.
            </p>
            <div className='flex flex-col sm:flex-row items-center justify-center gap-4'>
              <span className='inline-flex items-center gap-2 bg-[#FFDC55] text-gray-900 font-bold px-8 py-3.5 rounded-xl text-sm cursor-default select-none opacity-90'>
                Research Portal — Coming Soon
              </span>
              <Link
                href='/contact'
                className='inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-white/20 active:scale-[0.98] transition-all duration-200 text-sm'>
                <Mail className='w-4 h-4' />
                Contact Us
                <ArrowRight className='w-4 h-4' />
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
