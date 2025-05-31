"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Globe,
  HeartHandshake,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export default function AboutUsContent() {
  const shouldReduceMotion = useReducedMotion();
  const ourVision = useQuery(api.vision.getVision);
  const ourMission = useQuery(api.mission.getMission);

  return (
    <div className='min-h-screen bg-gradient-to-b from-background to-muted/30'>
      <div className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20'>
        <motion.div
          initial={shouldReduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}>
          {/* Hero Section */}
          <section className='text-center mb-16 sm:mb-20 lg:mb-24'>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}>
              <h1 className='text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80 tracking-tight'>
                About Godfrey Okoye University Postgraduate School
              </h1>
              <p className='text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
                A world-class institution committed to excellence, innovation,
                and holistic education. Join us to shape your future and make a
                global impact.
              </p>
            </motion.div>
          </section>

          {/* Why Choose GO University? */}
          <section className='mb-16 sm:mb-20 lg:mb-24'>
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10 sm:mb-12'>
              Why Choose GO University?
            </motion.h2>

            <motion.div
              variants={stagger}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: "-50px" }}
              className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8'>
              {[
                {
                  icon: (
                    <Globe
                      className='w-8 h-8 text-primary'
                      aria-hidden='true'
                    />
                  ),
                  title: "Global Recognition",
                  description:
                    "Our programs are internationally accredited, ensuring your degree is recognized worldwide.",
                },
                {
                  icon: <Award className='w-8 h-8 text-primary' />,
                  title: "Academic Excellence",
                  description:
                    "Ranked among the top universities in Africa, we offer rigorous, globally competitive curricula.",
                },
                {
                  icon: <BookOpen className='w-8 h-8 text-primary' />,
                  title: "Innovative Learning",
                  description:
                    "Cutting-edge teaching methods, including blended learning and research-driven programs.",
                },
                {
                  icon: <Users className='w-8 h-8 text-primary' />,
                  title: "Diverse Community",
                  description:
                    "Join a vibrant community of students and faculty from over 20 countries.",
                },
                {
                  icon: <Briefcase className='w-8 h-8 text-primary' />,
                  title: "Career Readiness",
                  description:
                    "Strong industry partnerships and career services to prepare you for the global job market.",
                },
                {
                  icon: <HeartHandshake className='w-8 h-8 text-primary' />,
                  title: "Values-Driven Education",
                  description:
                    "We nurture ethical leaders who are committed to making a positive impact in society.",
                },
              ].map((item, index) => (
                <motion.div key={index} variants={fadeInUp} className='group'>
                  <Card className='p-6 sm:p-8 h-full hover:shadow-lg transition-shadow duration-300 border-primary/20 hover:border-primary/40 dark:hover:border-primary/60'>
                    <div className='flex flex-col items-center text-center space-y-4'>
                      <div
                        className='mb-2 transform group-hover:scale-110 transition-transform duration-300'
                        aria-hidden='true'>
                        {item.icon}
                      </div>
                      <h3 className='text-xl font-semibold tracking-tight'>
                        {item.title}
                      </h3>
                      <p className='text-base text-muted-foreground leading-relaxed'>
                        {item.description}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </section>

          {/* Our Mission and Vision */}
          <section className='mb-16 sm:mb-20 lg:mb-24'>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8'>
              {ourMission?.map((mission) => (
                <Card
                  key={mission._id}
                  className='p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300 border-primary/20 hover:border-primary/40'>
                  <h3 className='text-2xl font-bold mb-4 text-primary'>
                    {mission.title}
                  </h3>
                  <p className='text-base text-muted-foreground leading-relaxed'>
                    {mission.desc}
                  </p>
                </Card>
              ))}
              {ourVision?.map((vision) => (
                <Card
                  key={vision._id}
                  className='p-6 sm:p-8 hover:shadow-lg transition-shadow duration-300 border-primary/20 hover:border-primary/40'>
                  <h3 className='text-2xl font-bold mb-4 text-primary'>
                    {vision.title}
                  </h3>
                  <p className='text-base text-muted-foreground leading-relaxed'>
                    {vision.desc}
                  </p>
                </Card>
              ))}
            </motion.div>
          </section>

          {/* Global Standards */}
          <section className='mb-16 sm:mb-20 lg:mb-24'>
            <motion.h2
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-10 sm:mb-12'>
              Global Standards, Local Impact
            </motion.h2>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center'>
              <div className='space-y-6'>
                <p className='text-lg text-muted-foreground leading-relaxed'>
                  At GO University, we combine global best practices with local
                  relevance. Our programs are designed to meet international
                  standards while addressing the unique challenges and
                  opportunities of our region.
                </p>
                <ul className='space-y-4 text-base text-muted-foreground'>
                  {[
                    "Internationally accredited programs",
                    "Collaborations with top global universities",
                    "State-of-the-art facilities and resources",
                    "Faculty with global expertise and experience",
                  ].map((item, index) => (
                    <li key={index} className='flex items-center space-x-3'>
                      <ArrowRight className='w-5 h-5 text-primary flex-shrink-0' />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className='relative rounded-xl overflow-hidden shadow-2xl'>
                <div className='aspect-[4/3] relative'>
                  <Image
                    src='/about_us_img.avif'
                    alt='Diverse group of postgraduate students collaborating in modern campus facilities'
                    fill
                    quality={90}
                    className='object-cover hover:scale-105 transition-transform duration-700'
                    sizes='(max-width: 768px) 100vw, 50vw'
                    priority={false}
                  />
                </div>
              </div>
            </motion.div>
          </section>

          {/* Call to Action */}
          <motion.section
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-center bg-primary/5 rounded-2xl p-8 sm:p-12'>
            <h2 className='text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6'>
              Ready to Join Us?
            </h2>
            <p className='text-lg text-muted-foreground mb-8 max-w-2xl mx-auto'>
              Take the first step toward a transformative educational
              experience.
            </p>
            <Button
              size='lg'
              className='bg-primary hover:bg-primary/90 text-white dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/90 font-medium px-8'
              asChild>
              <Link href='/courses' className='flex items-center space-x-2'>
                <span>Explore our Courses</span>
                <ArrowRight className='w-5 h-5' />
              </Link>
            </Button>
          </motion.section>
        </motion.div>
      </div>
    </div>
  );
}
