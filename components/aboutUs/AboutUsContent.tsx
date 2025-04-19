"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Globe,
  Award,
  BookOpen,
  Users,
  Briefcase,
  HeartHandshake,
} from "lucide-react";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export default function AboutUsContent() {
  const shouldReduceMotion = useReducedMotion();
  const ourVision = useQuery(api.vision.getVision);
  const ourMission = useQuery(api.mission.getMission);

  return (
    <div className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12'>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Hero Section */}
        <section className='text-center mb-8 sm:mb-12'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4'>
            About Godfrey Okoye University Postgraduate School
          </h1>
          <p className='text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto'>
            A world-class institution committed to excellence, innovation, and
            holistic education. Join us to shape your future and make a global
            impact.
          </p>
        </section>

        {/* Why Choose GO University? */}
        <section className='mb-12 sm:mb-16'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8'>
            Why Choose GO University?
          </h2>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6'>
            {[
              {
                icon: (
                  <Globe
                    className='w-6 h-6 sm:w-8 sm:h-8 dark:text-[#FFDC55]'
                    aria-hidden='true'
                  />
                ),
                title: "Global Recognition",
                description:
                  "Our programs are internationally accredited, ensuring your degree is recognized worldwide.",
              },
              {
                icon: (
                  <Award className='w-6 h-6 sm:w-8 sm:h-8 dark:text-[#FEDA37]' />
                ),
                title: "Academic Excellence",
                description:
                  "Ranked among the top universities in Africa, we offer rigorous, globally competitive curricula.",
              },
              {
                icon: (
                  <BookOpen className='w-6 h-6 sm:w-8 sm:h-8 dark:text-[#FEDA37]' />
                ),
                title: "Innovative Learning",
                description:
                  "Cutting-edge teaching methods, including blended learning and research-driven programs.",
              },
              {
                icon: (
                  <Users className='w-6 h-6 sm:w-8 sm:h-8 dark:text-[#FEDA37]' />
                ),
                title: "Diverse Community",
                description:
                  "Join a vibrant community of students and faculty from over 20 countries.",
              },
              {
                icon: (
                  <Briefcase className='w-6 h-6 sm:w-8 sm:h-8 dark:text-[#FEDA37]' />
                ),
                title: "Career Readiness",
                description:
                  "Strong industry partnerships and career services to prepare you for the global job market.",
              },
              {
                icon: (
                  <HeartHandshake className='w-6 h-6 sm:w-8 sm:h-8 dark:text-[#FEDA37]' />
                ),
                title: "Values-Driven Education",
                description:
                  "We nurture ethical leaders who are committed to making a positive impact in society.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true, margin: "100px" }}>
                <Card className='p-4 sm:p-6 h-full border-amber-300 dark:border-amber-300/20'>
                  <div className='flex flex-col items-center text-center'>
                    <div className='mb-3 sm:mb-4' aria-hidden='true'>
                      {item.icon}
                    </div>
                    <h3 className='text-lg sm:text-xl font-semibold mb-2'>
                      {item.title}
                    </h3>
                    <p className='text-sm sm:text-base text-muted-foreground dark:text-gray-300'>
                      {item.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Our Mission and Vision */}
        <section className='mb-12 sm:mb-16'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
            {ourMission?.map((mission) => (
              <Card key={mission._id} className='p-4 sm:p-6 min-h-[200px]'>
                <h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
                  {mission.title}
                </h3>
                <p className='text-sm sm:text-base text-muted-foreground dark:text-gray-300'>
                  {mission.desc}
                </p>
              </Card>
            ))}
            {ourVision?.map((vision) => (
              <Card key={vision._id} className='p-4 sm:p-6 min-h-[200px]'>
                <h3 className='text-xl sm:text-2xl font-bold mb-3 sm:mb-4'>
                  {vision.title}
                </h3>
                <p className='text-sm sm:text-base text-muted-foreground dark:text-gray-300'>
                  {vision.desc}
                </p>
              </Card>
            ))}
          </div>
        </section>

        {/* Global Standards */}
        <section className='mb-12 sm:mb-16'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold text-center mb-6 sm:mb-8'>
            Global Standards, Local Impact
          </h2>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6'>
            <div className='space-y-3 sm:space-y-4'>
              <p className='text-sm sm:text-base text-muted-foreground dark:text-gray-300'>
                At GO University, we combine global best practices with local
                relevance. Our programs are designed to meet international
                standards while addressing the unique challenges and
                opportunities of our region.
              </p>
              <ul className='list-disc pl-6 space-y-2 text-sm sm:text-base text-muted-foreground dark:text-gray-300'>
                <li>Internationally accredited programs</li>
                <li>Collaborations with top global universities</li>
                <li>State-of-the-art facilities and resources</li>
                <li>Faculty with global expertise and experience</li>
              </ul>
            </div>
            <div className='bg-muted rounded-lg p-4 sm:p-6 flex items-center justify-center'>
              <div className='relative w-full h-full min-h-[300px]'>
                <Image
                  src='/about_us_img.avif'
                  alt='Diverse group of postgraduate students collaborating in modern campus facilities'
                  fill
                  quality={85}
                  className='rounded-lg object-cover'
                  sizes='(max-width: 768px) 100vw, 50vw'
                  priority={false}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className='text-center'>
          <h2 className='text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4'>
            Ready to Join Us?
          </h2>
          <p className='text-sm sm:text-base text-muted-foreground dark:text-gray-300 mb-4 sm:mb-6'>
            Take the first step toward a transformative educational experience.
          </p>
          <Button
            size='lg'
            className='text-sm sm:text-base bg-[#006400] hover:bg-[#004d00] dark:bg-[#FFDC55] dark:text-gray-900'
            asChild>
            <Link href='/courses' aria-label='Explore available courses'>
              Explore our Courses
            </Link>
          </Button>
        </section>
      </motion.div>
    </div>
  );
}
