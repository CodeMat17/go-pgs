import CourseBrowser from "@/components/courses/CourseBrower";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Courses | GO University Postgraduate School",
  description:
    "Explore our accredited Masters, PhD, and postgraduate diploma programs across diverse disciplines. Advance your career with Nigeria's premier postgraduate education.",
  keywords: [
    "postgraduate courses Nigeria",
    "masters programs Enugu",
    "PhD degrees",
    "PGD courses",
    "academic programs",
    "graduate studies",
  ],
  openGraph: {
    title: "Postgraduate Course Catalog - GO University",
    description:
      "Discover our cutting-edge postgraduate programs in Business, Sciences, Humanities, and Technology. Accredited qualifications with flexible learning options.",
    images: [
      {
        url: "https://pg.gouni.edu.ng/courses/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "GO University Postgraduate Students",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GO Uni Postgraduate Programs",
    description:
      "Nigeria's leading postgraduate courses with industry-aligned curriculum and research excellence",
    images: ["https://pg.gouni.edu.ng/courses/opengraph-image.jpg"],
  },
  alternates: {
    canonical: "https://pg.gouni.edu.ng/courses",
  },
};

export default function ProgramsPage() {
  return (
    <div className='min-h-screen bg-background'>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className='relative overflow-hidden bg-gradient-to-br from-primary dark:from-gray-900 via-primary/90 to-primary/80 dark:to-gray-700 py-16 sm:py-20 lg:py-24'>
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
            Academic Programs
          </span>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight'>
            Our Courses
          </h1>
          <p className='mt-4 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed'>
            Explore our diverse range of accredited postgraduate programs across
            arts, sciences, law, management, and education.
          </p>

          {/* Level legend */}
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

      {/* ── Browser ───────────────────────────────────────────────────── */}
      <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16'>
        <CourseBrowser />
      </section>
    </div>
  );
}
