"use client";

import { SafeHTMLRenderer } from "@/components/SafeHTMLRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { motion, useReducedMotion } from "framer-motion";
import { Calendar, Download, FlaskConical, GraduationCap } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const CourseContent = () => {
  const params = useParams();
  const shouldReduceMotion = useReducedMotion();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const course = useQuery(
    api.courses.getProgramBySlug,
    slug ? { slug } : "skip"
  );

  const howToApply = useQuery(api.howToApply.getAll);

  const FileDownloadLink = ({
    fileId,
    title,
  }: {
    fileId: Id<"_storage">;
    title: string;
  }) => {
    const fileUrl = useQuery(api.courses.getFileUrl, { fileId });

    if (!fileUrl) return null;

    return (
      <Button asChild size='icon' variant='outline' className='shrink-0'>
        <a
          href={fileUrl}
          download={`${title}.pdf`}
          className='text-blue-600 hover:underline text-sm block'>
          <Download />
        </a>
      </Button>
    );
  };

  // Add structured data for SEO
  useEffect(() => {
    if (course) {
      const structuredData = {
        "@context": "https://schema.org",
        "@type": "Course",
        name: course.course,
        description: course.overview,
        courseMode: course.mode,
        timeRequired: course.duration,
        provider: {
          "@type": "Organization",
          name: "Godfrey Okoye University",
          sameAs: process.env.NEXT_PUBLIC_SITE_URL,
        },
      };
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(structuredData);
      document.head.appendChild(script);

      // Return cleanup function with void return type
      return () => {
        document.head.removeChild(script);
      };
    }
  }, [course]);

  if (course === undefined) {
    return (
      <div
        className='flex items-center justify-center py-72'
        aria-live='polite'>
        <p className='text-xl text-gray-500'>Loading course details...</p>
      </div>
    );
  }

  return (
    <div className='w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 '>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Hero Section */}
        <article className='text-center mb-8 sm:mb-12'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2'>
            {course?.course}
          </h1>
          <div
            className='flex justify-center gap-3 sm:gap-4 text-sm text-muted-foreground'
            aria-label='Course details'>
            <div className='flex items-center gap-1'>
              <Calendar className='w-4 h-4' aria-hidden='true' />
              <span>{course?.duration}</span>
            </div>
            <span aria-hidden='true'>|</span>
            <div className='flex items-center gap-1'>
              <GraduationCap className='w-4 h-4' aria-hidden='true' />
              <span>{course?.mode}</span>
            </div>
          </div>
        </article>

        {/* Program Details */}
        <div className='grid gap-6 md:grid-cols-[1fr_300px] lg:grid-cols-[1fr_400px]'>
          {/* Main Content */}
          <main className='space-y-6'>
            {/* Why Choose Us */}
            <Card className='p-4 sm:p-6'>
              <h2 className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-2'>
                <FlaskConical
                  className='w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0'
                  aria-hidden='true'
                />
                Why Choose This Course?
              </h2>
              <div className='space-y-3 sm:space-y-4'>
                {course?.whyChoose.map((item, index) => (
                  <div
                    key={index}
                    className='flex items-start gap-3 sm:gap-4'
                    role='listitem'>
                    <div
                      className='w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'
                      aria-hidden='true'>
                      <span className='text-primary text-sm sm:text-base'>
                        {index + 1}
                      </span>
                    </div>
                    <div>
                      <h3 className='font-medium text-base sm:text-lg'>
                        {item.title}
                      </h3>
                      <p className='text-muted-foreground text-sm sm:text-base'>
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Program Overview */}
            <Card className='p-4 sm:p-6'>
              <h2 className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-4'>
                Program Overview
              </h2>
              <div className='space-y-3 sm:space-y-4'>
                <SafeHTMLRenderer
                  htmlContent={course?.overview ?? ""}
                  className='text-gray-950 dark:text-muted-foreground prose dark:prose-invert max-w-none'
                />
              </div>
            </Card>

            {/* Course Materials */}
            <Card className='p-4 sm:p-6'>
              <h2 className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-4'>
                Course Materials
              </h2>

              {course?.courseMaterials?.length ? (
                <div className='space-y-4'>
                  {course?.courseMaterials?.map((mat) => (
                    <div
                      key={mat.file}
                      className='flex items-center gap-3 justify-between'>
                      <p>{mat.title} </p>
                      {/* <Button size='icon' variant='outline' className="shrink-0"><Download /></Button> */}
                      <FileDownloadLink fileId={mat.file} title={mat.title} />
                    </div>
                  ))}
                </div>
              ) : (
                <p className='py-6 text-muted-foreground'>
                  No course material available at the moment
                </p>
              )}
            </Card>
          </main>

          {/* Sidebar */}
          <aside className='space-y-6'>
            {/* Application CTA */}
            <Card className='p-6 bg-[#FFD700]/30 dark:bg-[#FFD700]/20'>
              <h2 className='text-gray-900 dark:text-gray-100 text-lg sm:text-xl font-semibold mb-3 sm:mb-4'>
                HOW TO APPLY
              </h2>
              {howToApply &&
                howToApply.map((apply) => (
                  <div key={apply._id}>
                    <div className='mb-6'>
                      <SafeHTMLRenderer
                        htmlContent={apply.text}
                        className='text-gray-950 dark:text-muted-foreground prose dark:prose-invert max-w-none leading-5'
                      />
                    </div>
                    <Button
                      className='w-full text-sm sm:text-base bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200'
                      asChild>
                      <a
                        href={apply.link}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label='Apply now through online form'>
                        Apply Now
                      </a>
                    </Button>
                  </div>
                ))}
            </Card>

            {/* Key Facts */}
            <Card className='p-4 sm:p-6'>
              <h2 className='text-lg sm:text-xl font-semibold mb-3 sm:mb-4'>
                Key Facts
              </h2>
              <dl className='space-y-3 text-sm sm:text-base'>
                <div className='flex items-center gap-2'>
                  <Calendar
                    className='w-4 h-4 sm:w-5 sm:h-5 text-primary'
                    aria-hidden='true'
                  />
                  <div>
                    <dt className='sr-only'>Duration</dt>
                    <dd>{course?.duration}</dd>
                  </div>
                </div>
                <div className='flex items-center gap-2'>
                  <GraduationCap
                    className='w-4 h-4 sm:w-5 sm:h-5 text-primary'
                    aria-hidden='true'
                  />
                  <div>
                    <dt className='sr-only'>Study mode</dt>
                    <dd>{course?.mode}</dd>
                  </div>
                </div>
              </dl>
            </Card>
          </aside>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseContent;
