"use client";

import { SafeHTMLRenderer } from "@/components/SafeHTMLRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Calendar, FlaskConical, GraduationCap } from "lucide-react";
import { useParams } from "next/navigation";

const CourseContent = () => {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const course = useQuery(
    api.courses.getProgramBySlug,
    slug ? { slug } : "skip"
  );

  if (course === undefined) {
    return (
      <div className='flex items-center justify-center py-72'>
        <p className='text-xl text-gray-500'>Loading course details...</p>
      </div>
    );
  }

  return (
    <div className='w-full max-w-5xl mx-auto px-4 py-8 sm:py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Hero Section */}
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-2'>
            {course?.course}
          </h1>
          <div className='flex justify-center gap-3 sm:gap-4 text-sm text-muted-foreground'>
            <div className='flex items-center justify-center gap-1'>
              <Calendar className='w-4 h-4' />
              <span>{course?.duration}</span>
            </div>{" "}
            |
            <div className='flex items-center justify-center gap-1'>
              <GraduationCap className='w-4 h-4' />
              <span>{course?.mode}</span>
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className='grid gap-6 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_300px]'>
          {/* Main Content */}
          <div className='space-y-6'>
            {/* Why Choose Us */}
            <Card className='p-4 sm:p-6'>
              <h2 className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-2'>
                <FlaskConical className='w-5 h-5 sm:w-6 sm:h-6 text-primary shrink-0' />
                Why Choose this course and with us?
              </h2>
              <div className='space-y-3 sm:space-y-4'>
                {course?.whyChoose.map((item, index) => (
                  <div key={index} className='flex items-start gap-3 sm:gap-4'>
                    <div className='w-6 h-6 sm:w-8 sm:h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0'>
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
              <div className='space-y-3 sm:space-y-4 dark:text-muted-foreground text-sm sm:text-base'>
                <SafeHTMLRenderer
                  htmlContent={course?.overview ?? ""}
                  className='text-gray-950 dark:text-muted-foreground'
                />
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Application CTA */}
            <Card className='p-8 bg-[#FEDA37]/90'>
              <h2 className='text-gray-900 text-lg sm:text-xl font-semibold mb-3 sm:mb-4'>
                Start Your Application
              </h2>
              <Button className='w-full text-sm sm:text-base' asChild>
                <a href='https://form.jotform.com/241452745198362'>Apply Now</a>
              </Button>
            </Card>

            {/* Key Facts */}
            <Card className='p-4 sm:p-6'>
              <h2 className='text-lg sm:text-xl font-semibold mb-3 sm:mb-4'>
                Key Facts
              </h2>
              <div className='space-y-3 text-sm sm:text-base'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
                  <span>Duration: {course?.duration}</span>
                </div>
                <div className='flex items-center gap-2'>
                  <GraduationCap className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
                  <span>Study mode: {course?.mode}</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CourseContent;
