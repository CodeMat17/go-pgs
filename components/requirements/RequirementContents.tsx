"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  Globe,
  GraduationCap,
} from "lucide-react";

// ── Helpers ──────────────────────────────────────────────────────────────────
function getAccent(title: string) {
  const t = title.toLowerCase();
  if (t.includes("pgd") || t.includes("postgraduate diploma"))
    return {
      bar: "bg-blue-500",
      icon: "text-blue-500",
      iconBg: "bg-blue-50 dark:bg-blue-900/30",
    };
  if (t.includes("master") || t.includes("msc") || t.includes("mba"))
    return {
      bar: "bg-violet-500",
      icon: "text-violet-500",
      iconBg: "bg-violet-50 dark:bg-violet-900/30",
    };
  if (t.includes("phd") || t.includes("doctorate") || t.includes("doctor"))
    return {
      bar: "bg-emerald-500",
      icon: "text-emerald-500",
      iconBg: "bg-emerald-50 dark:bg-emerald-900/30",
    };
  return { bar: "bg-primary", icon: "text-primary", iconBg: "bg-primary/10" };
}

// ── Main Component ───────────────────────────────────────────────────────────
export default function RequirementsContent() {
  const requirements = useQuery(
    api.admissionRequirements.getAdmissionRequirements
  );
  const otherRoutes = useQuery(
    api.alternativeAdmissions.getAlternativeAdmissionRoute
  );

  const isLoading = requirements === undefined;

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
            Admissions
          </span>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight'>
            Admission Requirements
          </h1>
          <p className='mt-4 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed'>
            Learn about the eligibility criteria for our postgraduate
            programmes. Admission decisions are based on academic merit and open
            to all irrespective of nationality, ethnicity, sex, or physical
            ability.
          </p>

          {/* Programme legend */}
          <div className='mt-8 flex flex-wrap gap-4'>
            {[
              { label: "PGD", color: "bg-blue-400" },
              { label: "Masters", color: "bg-violet-400" },
              { label: "PhD", color: "bg-emerald-400" },
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

      {/* ── Requirements Grid ───────────────────────────────────────────── */}
      <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        {isLoading ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className='rounded-2xl border border-border overflow-hidden'>
                <div className='h-1 bg-muted' />
                <div className='p-6 space-y-3'>
                  <div className='flex items-center gap-3 mb-5'>
                    <Skeleton className='w-10 h-10 rounded-xl flex-shrink-0' />
                    <Skeleton className='h-5 w-2/3 rounded-lg' />
                  </div>
                  <div className='space-y-2.5'>
                    {[...Array(5)].map((_, j) => (
                      <Skeleton key={j} className='h-4 w-full rounded-lg' />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : requirements?.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 text-center gap-3'>
            <div className='w-16 h-16 rounded-2xl bg-muted flex items-center justify-center'>
              <GraduationCap className='w-8 h-8 text-muted-foreground/40' />
            </div>
            <p className='text-lg font-semibold text-foreground'>
              No requirements listed yet
            </p>
            <p className='text-sm text-muted-foreground'>
              Check back later or contact the admissions office.
            </p>
          </div>
        ) : (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {requirements?.map((req, index) => {
              const accent = getAccent(req.title);
              return (
                <motion.div
                  key={req._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08 }}
                  className='flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                  <div className={`h-1 w-full ${accent.bar}`} />
                  <div className='flex flex-col flex-1 p-6'>
                    <div className='flex items-center gap-3 mb-5'>
                      <div
                        className={`w-10 h-10 rounded-xl ${accent.iconBg} flex items-center justify-center flex-shrink-0`}>
                        <GraduationCap
                          className={`w-5 h-5 ${accent.icon}`}
                          aria-hidden='true'
                        />
                      </div>
                      <h2 className='font-semibold text-foreground text-base leading-snug'>
                        {req.title}
                      </h2>
                    </div>
                    <ul className='space-y-2.5'>
                      {req.requirements.map((item, i) => (
                        <li
                          key={i}
                          className='flex items-start gap-2.5 text-sm text-muted-foreground'>
                          <CheckCircle2 className='w-4 h-4 text-green-500 flex-shrink-0 mt-0.5' />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* ── Alternative Admission Routes ─────────────────────────────────── */}
      {otherRoutes && otherRoutes.length > 0 && (
        <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16'>
          <div className='mb-8'>
            <div className='flex items-center gap-2.5 mb-2'>
              <Globe className='w-5 h-5 text-primary' aria-hidden='true' />
              <h2 className='text-2xl font-bold text-foreground'>
                Other Admission Routes
              </h2>
            </div>
            <p className='text-muted-foreground text-sm'>
              Additional pathways for candidates who qualify through alternative
              criteria.
            </p>
          </div>
          <div className='grid sm:grid-cols-2 gap-5'>
            {otherRoutes.map((route, index) => (
              <motion.div
                key={route._id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className='rounded-2xl border border-border bg-card p-6 hover:shadow-md transition-shadow duration-300'>
                <h3 className='font-semibold text-foreground mb-2'>
                  {route.title}
                </h3>
                <p className='text-sm text-muted-foreground leading-relaxed'>
                  {route.description}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      )}

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
              Ready to Begin Your Journey?
            </h2>
            <p className='text-white/75 text-base max-w-xl mx-auto mb-8 leading-relaxed'>
              Meet the requirements? Start your application today and take the
              next step in your academic career at GO University.
            </p>
            {/* <Link
              href='/apply'
              className='inline-flex items-center gap-2 bg-[#FFDC55] text-gray-900 font-bold px-8 py-3.5 rounded-xl hover:bg-[#FFD23F] active:scale-[0.98] transition-all duration-200 text-sm'>
              Apply Now
              <ArrowRight className='w-4 h-4' />
            </Link> */}
          </div>
        </motion.div>
      </section>
    </div>
  );
}
