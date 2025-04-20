import CourseContent from "@/components/courses/CourseContent";
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await params first
  const { slug } = await params;

  const course = await fetchQuery(api.courses.getProgramBySlug, { slug });

  if (!course) {
    return {
      title: "Course Not Found",
      description: "The requested course could not be found",
      robots: "noindex, nofollow",
    };
  }

  const baseUrl = "https://pg.gouni.edu.ng";

  return {
    title: `${course.course}`,
    description: truncate(course.overview, 80),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/courses/${slug}`,
    },
    openGraph: {
      title: course.course,
      description: truncate(course.overview, 80),
      type: "article",
      publishedTime: new Date(course._creationTime).toISOString(),
      url: `/news/${slug}`,
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
      description: truncate(course.overview, 80),
      images: `${baseUrl}/courses/opengraph-image.jpg`,
    },
    
  };
}

const truncate = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;

const ProgramDetail = () => {
  return <CourseContent />;
};

export default ProgramDetail;
