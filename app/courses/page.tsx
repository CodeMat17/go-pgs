import CoursesTabs from "@/components/courses/CoursesTabs";
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
        url: "https://pg.gouni.edu.ng/opengraph-image.jpg",
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
    images: ["https://pg.gouni.edu.ng/opengraph-image.jpg"],
  },
  alternates: {
    canonical: "https://pg.gouni.edu.ng/courses",
  },
};



export default function ProgramsPage() {
 

  return (
    <div className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-gray-950'>
      <h1 className='text-3xl sm:text-4xl font-bold mb-4'>Our Courses</h1>
      <p className='text-lg text-muted-foreground mb-8'>
        Explore our diverse range of academic courses. Find the right course for
        you.
      </p>

      <CoursesTabs />
    </div>
  );
}
