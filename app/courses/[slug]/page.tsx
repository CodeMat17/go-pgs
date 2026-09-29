import CourseContent from "@/components/courses/CourseContent";
import {
  excerpt,
  getAllCourses,
  getCourseBySlug,
  getHowToApply,
  sanitizeBasicHtml,
} from "@/lib/server-data";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const courses = await getAllCourses();
  return courses.map(({ slug }) => ({ slug }));
}

const baseUrl = "https://pg.gouni.edu.ng";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found",
      robots: "noindex, nofollow",
    };
  }

  const description = excerpt(course.overview, 155);

  return {
    title: `${course.course}`,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/courses/${slug}`,
    },
    openGraph: {
      title: course.course,
      description,
      type: "article",
      publishedTime: new Date(course._creationTime).toISOString(),
      url: `/courses/${slug}`,
      images: [
        {
          url: `${baseUrl}/courses/opengraph-image.jpg`,
          width: 1200,
          height: 630,
          alt: course.course,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: course.course,
      description,
      images: `${baseUrl}/courses/opengraph-image.jpg`,
    },
  };
}

export default async function ProgramDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [course, howToApply] = await Promise.all([
    getCourseBySlug(slug),
    getHowToApply(),
  ]);

  const jsonLd = course && {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.course,
    description: excerpt(course.overview, 500),
    url: `${baseUrl}/courses/${slug}`,
    timeRequired: course.duration,
    provider: {
      "@type": "CollegeOrUniversity",
      name: "Godfrey Okoye University",
      sameAs: "https://www.gouni.edu.ng",
    },
  };

  return (
    <>
      {jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <CourseContent
        initialCourse={course}
        initialOverviewHtml={course ? sanitizeBasicHtml(course.overview) : undefined}
        initialHowToApply={howToApply.map((a) => ({
          ...a,
          html: sanitizeBasicHtml(a.text),
        }))}
      />
    </>
  );
}
