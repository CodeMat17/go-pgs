import { cn } from "@/lib/utils";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

/**
 * Shared header band for inner pages. Always rendered on the deep-indigo
 * brand surface so it reads the same in light and dark themes.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  crumbs,
  className,
  containerClassName,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  children?: React.ReactNode;
  /** Optional trail after "Home", e.g. [{ label: "News", href: "/news" }, { label: "Article" }] */
  crumbs?: { label: string; href?: string }[];
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden bg-brand-950 text-white",
        className
      )}>
      {/* Ambient layers */}
      <div className='pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-brand-900 via-brand-950 to-[#0b0822]' aria-hidden='true' />
      <div className='pointer-events-none absolute inset-0 -z-10 bg-grid bg-grid-fade opacity-50' aria-hidden='true' />
      <div className='pointer-events-none absolute -right-32 -top-32 -z-10 h-96 w-96 rounded-full bg-gold/15 blur-3xl' aria-hidden='true' />
      <div className='pointer-events-none absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full bg-brand-500/25 blur-3xl' aria-hidden='true' />
      <div className='pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent' aria-hidden='true' />

      <div className={cn("container-page py-14 sm:py-20 lg:py-24", containerClassName)}>
        {crumbs && crumbs.length > 0 && (
          <nav aria-label='Breadcrumb' className='mb-6'>
            <ol className='flex flex-wrap items-center gap-1.5 text-xs font-semibold text-white/50'>
              <li>
                <Link href='/' className='transition-colors hover:text-gold'>
                  Home
                </Link>
              </li>
              {crumbs.map((c) => (
                <li key={c.label} className='flex items-center gap-1.5'>
                  <ChevronRight className='h-3 w-3' />
                  {c.href ? (
                    <Link href={c.href} className='transition-colors hover:text-gold'>
                      {c.label}
                    </Link>
                  ) : (
                    <span className='line-clamp-1 text-white/80'>{c.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {eyebrow && (
          <span className='mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 text-xs font-extrabold uppercase tracking-[0.16em] text-gold'>
            <span className='h-1.5 w-1.5 rounded-full bg-gold' />
            {eyebrow}
          </span>
        )}

        <h1 className='max-w-4xl text-balance text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl'>
          {title}
        </h1>

        {description && (
          <p className='mt-5 max-w-2xl text-base leading-relaxed text-white/70 sm:text-lg'>
            {description}
          </p>
        )}

        {children && <div className='mt-8'>{children}</div>}
      </div>
    </section>
  );
}

/** Centered section heading used across pages. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl",
        className
      )}>
      {eyebrow && <span className='eyebrow mb-4'>{eyebrow}</span>}
      <h2 className='text-balance text-3xl font-black leading-tight tracking-tight text-foreground sm:text-4xl lg:text-[2.75rem]'>
        {title}
      </h2>
      {description && (
        <p className='mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg'>
          {description}
        </p>
      )}
    </div>
  );
}
