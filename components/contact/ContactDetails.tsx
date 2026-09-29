"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AnimatePresence, m, useInView, useReducedMotion } from "framer-motion";
import {
  BookOpen,
  Building2,
  Clock,
  GraduationCap,
  HeartHandshake,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";
import { useEffect, useRef } from "react";

// ── Skeleton ──────────────────────────────────────────────────────────────────
function Skeleton({ className }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-muted ${className ?? ""}`} />
  );
}

function ContactSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-card p-6 space-y-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-3/4" />
          </div>
        ))}
      </div>
      <div className="grid sm:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border bg-card p-6 space-y-3">
            <Skeleton className="h-10 w-10 rounded-xl" />
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-3 w-2/3" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Info card ─────────────────────────────────────────────────────────────────
interface InfoCardProps {
  icon: React.ReactNode;
  title: string;
  accent: string;
  children: React.ReactNode;
  delay?: number;
  shouldReduceMotion: boolean | null;
}

function InfoCard({ icon, title, accent, children, delay = 0, shouldReduceMotion }: InfoCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="group rounded-2xl border bg-card p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent} shrink-0`}>
        {icon}
      </div>
      <div className="space-y-1">
        <h2 className="font-semibold text-foreground">{title}</h2>
        <div className="text-sm text-muted-foreground leading-relaxed space-y-0.5">
          {children}
        </div>
      </div>
    </m.div>
  );
}

// ── Dept card ─────────────────────────────────────────────────────────────────
interface DeptCardProps {
  icon: React.ReactNode;
  title: string;
  accent: string;
  email?: string;
  tel?: string;
  delay?: number;
  shouldReduceMotion: boolean | null;
}

function DeptCard({ icon, title, accent, email, tel, delay = 0, shouldReduceMotion }: DeptCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <m.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className="group rounded-2xl border bg-card p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
    >
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${accent} shrink-0`}>
        {icon}
      </div>
      <div className="space-y-2">
        <h2 className="font-semibold text-foreground">{title}</h2>
        {email && (
          <a
            href={`mailto:${email}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{email}</span>
          </a>
        )}
        {tel && (
          <a
            href={`tel:${tel}`}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-3.5 h-3.5 shrink-0" />
            <span>{tel}</span>
          </a>
        )}
      </div>
    </m.div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ContactDetails() {
  const info = useQuery(api.contactUs.getContactInfo);
  const shouldReduceMotion = useReducedMotion();

  const isLoading = info === undefined;

  // Structured data for SEO
  useEffect(() => {
    if (!info) return;
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Godfrey Okoye University Postgraduate School",
      address: info.address,
      email: info.email?.[0]?.email1,
      telephone: info.phone?.[0]?.tel1,
      openingHours: info.officeHours?.map((oh) => `${oh.days} ${oh.time}`),
    };
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.text = JSON.stringify(schemaData);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, [info]);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero ── */}
      <section className="hero-brand">
        {/* Decorative blobs */}
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
          <div
            className="motion-safe:animate-fade-up mb-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-gold"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true"  />
            We&apos;re Here to Help
          </div>

          <h1
            className="motion-safe:animate-fade-up text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight"
          >
            Get in Touch
          </h1>

          <p
            className="motion-safe:animate-fade-up mt-4 max-w-2xl mx-auto text-white/70 text-lg"
          >
            Reach out to our admissions and support teams. We are always ready
            to assist you on your postgraduate journey.
          </p>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="mx-auto max-w-5xl px-4 py-16 space-y-12">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <m.div key="skeleton" exit={{ opacity: 0 }}>
              <ContactSkeleton />
            </m.div>
          ) : (
            <m.div key="content" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">

              {/* ── Primary info grid ── */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Address */}
                <InfoCard
                  icon={<MapPin className="w-5 h-5 text-primary" />}
                  title="Our Address"
                  accent="bg-primary/10"
                  delay={0}
                  shouldReduceMotion={shouldReduceMotion}
                >
                  <p>{info?.address ?? "Address not available"}</p>
                </InfoCard>

                {/* Phone */}
                <InfoCard
                  icon={<Phone className="w-5 h-5 text-indigo-600" />}
                  title="Phone"
                  accent="bg-indigo-50 dark:bg-indigo-950"
                  delay={0.08}
                  shouldReduceMotion={shouldReduceMotion}
                >
                  {info?.phone?.flatMap((tel) => [tel.tel1, tel.tel2]).map((num, i) => (
                    <p key={i}>
                      <a
                        href={`tel:${num}`}
                        className="hover:text-primary transition-colors"
                        aria-label={`Call ${num}`}
                      >
                        {num}
                      </a>
                    </p>
                  ))}
                  {!info?.phone?.length && <p>Not available</p>}
                </InfoCard>

                {/* Email */}
                <InfoCard
                  icon={<Mail className="w-5 h-5 text-amber-600" />}
                  title="Email"
                  accent="bg-amber-50 dark:bg-amber-950"
                  delay={0.16}
                  shouldReduceMotion={shouldReduceMotion}
                >
                  {info?.email?.flatMap((e) => [e.email1, e.email2]).map((addr, i) => (
                    <p key={i}>
                      <a
                        href={`mailto:${addr}`}
                        className="hover:text-primary transition-colors break-all"
                        aria-label={`Email ${addr}`}
                      >
                        {addr}
                      </a>
                    </p>
                  ))}
                  {!info?.email?.length && <p>Not available</p>}
                </InfoCard>

                {/* Office Hours */}
                <InfoCard
                  icon={<Clock className="w-5 h-5 text-emerald-600" />}
                  title="Office Hours"
                  accent="bg-emerald-50 dark:bg-emerald-950"
                  delay={0.24}
                  shouldReduceMotion={shouldReduceMotion}
                >
                  {info?.officeHours?.map((oh, i) => (
                    <div key={i}>
                      <span className="font-medium text-foreground">{oh.days}</span>
                      <br />
                      <span>{oh.time}</span>
                    </div>
                  ))}
                  {!info?.officeHours?.length && <p>Mon – Fri: 8:00am – 5:00pm</p>}
                </InfoCard>
              </div>

              {/* ── Department offices ── */}
              {(info?.admissionOffice?.length ||
                info?.researchOffice?.length ||
                info?.studentSupport?.length) ? (
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div className="h-px flex-1 bg-border" />
                    <h2 className="text-sm font-semibold uppercase tracking-widest text-muted-foreground">
                      Department Contacts
                    </h2>
                    <div className="h-px flex-1 bg-border" />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    {info?.admissionOffice?.[0] && (
                      <DeptCard
                        icon={<GraduationCap className="w-5 h-5 text-primary" />}
                        title="Admissions Office"
                        accent="bg-primary/10"
                        email={info.admissionOffice[0].email}
                        tel={info.admissionOffice[0].tel}
                        delay={0}
                        shouldReduceMotion={shouldReduceMotion}
                      />
                    )}
                    {info?.researchOffice?.[0] && (
                      <DeptCard
                        icon={<BookOpen className="w-5 h-5 text-indigo-600" />}
                        title="Research Office"
                        accent="bg-indigo-50 dark:bg-indigo-950"
                        email={info.researchOffice[0].email}
                        tel={info.researchOffice[0].tel}
                        delay={0.1}
                        shouldReduceMotion={shouldReduceMotion}
                      />
                    )}
                    {info?.studentSupport?.[0] && (
                      <DeptCard
                        icon={<HeartHandshake className="w-5 h-5 text-emerald-600" />}
                        title="Student Support"
                        accent="bg-emerald-50 dark:bg-emerald-950"
                        email={info.studentSupport[0].email}
                        tel={info.studentSupport[0].tel}
                        delay={0.2}
                        shouldReduceMotion={shouldReduceMotion}
                      />
                    )}
                  </div>
                </div>
              ) : null}

              {/* ── Find us ── */}
              <m.div
                initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl border bg-card overflow-hidden"
              >
                <div className="flex items-center gap-3 px-6 py-4 border-b">
                  <Building2 className="w-5 h-5 text-primary" />
                  <h2 className="font-semibold text-foreground">Find Us</h2>
                </div>
                <div className="p-6 space-y-2">
                  <p className="text-sm text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Godfrey Okoye University Postgraduate School
                    </span>
                    <br />
                    {info?.address}
                  </p>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(info?.address ?? "Godfrey Okoye University Enugu Nigeria")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline mt-2"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    Open in Google Maps
                  </a>
                </div>
              </m.div>

              {/* ── CTA strip ── */}
              <m.div
                initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5 }}
                className="hero-brand rounded-3xl p-8 sm:p-12 text-center space-y-4"
              >
                <h2 className="text-2xl sm:text-3xl font-black">Ready to Start?</h2>
                <p className="text-white/70 max-w-xl mx-auto">
                  Have questions about admission, programmes, or fees? Reach
                  out — our team responds within one business day.
                </p>
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  {info?.email?.[0]?.email1 && (
                    <a
                      href={`mailto:${info.email[0].email1}`}
                      className="inline-flex items-center gap-2 rounded-full bg-gold text-brand-950 font-extrabold px-6 py-3 text-sm hover:bg-gold-300 transition-colors"
                    >
                      <Mail className="w-4 h-4" />
                      Send an Email
                    </a>
                  )}
                  {info?.phone?.[0]?.tel1 && (
                    <a
                      href={`tel:${info.phone[0].tel1}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/5 text-white font-bold px-6 py-3 text-sm hover:bg-white/10 transition-colors backdrop-blur-sm"
                    >
                      <Phone className="w-4 h-4" />
                      Call Us Now
                    </a>
                  )}
                </div>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
