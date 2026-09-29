import CourseBrowser from "@/components/courses/CourseBrower";
import { getAllCourses, getFaculties } from "@/lib/server-data";
import { Metadata } from "next";

export const revalidate = 60;

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

export default async function ProgramsPage() {
  const [initialCourses, initialFaculties] = await Promise.all([
    getAllCourses(),
    getFaculties(),
  ]);

  return (
    <div className='min-h-screen bg-background'>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className='hero-brand py-16 sm:py-20 lg:py-24'>
        <div
          className='absolute -top-24 -right-24 w-72 h-72 rounded-full bg-gold/10 blur-3xl pointer-events-none'
          aria-hidden='true'
        />
        <div
          className='absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none'
          aria-hidden='true'
        />

        <div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <span className='inline-flex mb-5 px-3.5 py-1.5 rounded-full bg-gold/10 border border-gold/30 text-gold text-xs font-extrabold uppercase tracking-[0.16em]'>
            Academic Programs
          </span>
          <h1 className='text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.05]'>
            Our Courses
          </h1>
          <p className='mt-4 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed'>
            Explore our diverse range of accredited postgraduate programs across
            arts, sciences, law, management, and education.
          </p>

          {/* Level legend */}
          <div className='mt-8 flex flex-wrap gap-4'>
            {[
              { label: "PGD", color: "bg-indigo-400" },
              { label: "Masters", color: "bg-amber-400" },
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
        <CourseBrowser
          initialCourses={initialCourses}
          initialFaculties={initialFaculties}
        />
      </section>
    </div>
  );
}
