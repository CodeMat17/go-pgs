"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import { ApplyNow } from "../buttons/ApplyNow";
import { QuickLinks } from "../QuickLinks";

const DescriptionAnimation = dynamic(() => import("../DescriptionAnimation"), {
  ssr: false,
  loading: () => <div className='h-8' aria-hidden='true' />,
});

const HomeContent = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative w-full min-h-[500px] lg:h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden'>
        {/* Background Image with Gradient Overlay */}
        <div className='absolute inset-0 z-0'>
          <Image
            src='/hero-bg.avif'
            alt='Aerial view of Godfrey Okoye University campus with modern buildings and green spaces'
            fill
            priority
            className='object-cover object-center'
            quality={90}
            sizes='100vw'
            aria-hidden='true'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 dark:from-black/90 dark:to-secondary/80' />
        </div>

        {/* Hero Content */}
        <div className='relative w-full z-10 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center justify-between gap-2 md:gap-0 pb-7 sm:pt-7'>
          {/* Student Image Container */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, x: 20 }
            }
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative ml-5 sm:ml-0 h-[320px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full md:w-[50%]'>
            <Image
              src='/student.avif'
              alt='Postgraduate student engaged in research at a university library'
              fill
              priority
              quality={85}
              className='object-contain object-center'
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px'
            />
          </motion.div>

          {/* Text Container */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='md:w-[60%] text-center md:text-left lg:pl-6 xl:pl-12'>
            <motion.h1
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='text-4xl md:text-[48px] xl:text-6xl font-bold text-white mb-2 sm:mb-4 [text-shadow:_0_2px_4px_rgba(0,0,0,0.25)]'>
              Elevate Your Academic Journey at
              <span className='block text-[#FFDC55]'>
                {" "}
                {/* Adjusted for better contrast */}
                Godfrey Okoye Postgraduate School
              </span>
            </motion.h1>

            <DescriptionAnimation />

            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}>
              <ApplyNow />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className='py-16 bg-muted'>
        <QuickLinks />
      </section>
    </div>
  );
};

export default HomeContent;
