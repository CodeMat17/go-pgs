"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ApplyNow } from "../buttons/ApplyNow";
import { QuickLinks } from "../QuickLinks";

const DescriptionAnimation = dynamic(() => import("../DescriptionAnimation"), {
  ssr: false,
  loading: () => <div className='h-8' aria-hidden='true' />,
});

const HomeContent = () => {
  const shouldReduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], ["0%", "20%"]);

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative w-full min-h-[600px] lg:h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden'>
        {/* Background Image with Parallax and Pattern Overlay */}
        <motion.div
          className='absolute inset-0 z-0'
          style={{ y: shouldReduceMotion ? 0 : backgroundY }}>
          <Image
            src='/hero-bg.avif'
            alt='Aerial view of Godfrey Okoye University campus with modern buildings and green spaces'
            fill
            priority
            className='object-cover object-center scale-105'
            quality={100}
            sizes='100vw'
            aria-hidden='true'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-primary/60 to-secondary/60 dark:from-black/70 dark:to-secondary/70 mix-blend-multiply' />
          <div
            className='absolute inset-0 bg-[url("/pattern.png")] opacity-20'
            aria-hidden='true'
          />
        </motion.div>

        {/* Hero Content */}
        <div className='relative w-full z-10 max-w-5xl mx-auto px-4 flex flex-col items-center lg:items-start gap-2 md:gap-0 py-12'>
          {/* Text Container */}
          <motion.div
            initial={
              shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 30 }
            }
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className='max-w-4xl lg:px-12 xl:px-0'>
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='mb-6'>
              <h1
                className='
                text-4xl sm:text-5xl lg:text-6xl 
                font-extrabold text-white 
                
                tracking-tight 
                [text-shadow:_2px_2px_8px_rgba(0,0,0,0.5)] 
                leading-[1.15]
                 max-w-3xl'>
                Elevate Your Academic Journey at
              </h1>
              <h1
                className='
                text-4xl sm:text-5xl lg:text-6xl 
               
                mb-6 sm:mb-8 
                tracking-tight  font-extrabold
                [text-shadow:_2px_2px_8px_rgba(0,0,0,0.5)] 
                leading-[1.15]
                 text-[#FFDC55]'>
                Godfrey Okoye University
                <span className='block text-2xl sm:text-3xl md:text-4xl xl:text-5xl mt-2 sm:mt-3 font-bold'>
                  School of Postgraduate Studies
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className='backdrop-blur-sm bg-black/5 px-2 rounded-xl w-full max-w-2xl'>
              <DescriptionAnimation />
            </motion.div>

            <motion.div
              initial={
                shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className='mt-8 lg:mt-10'>
              <ApplyNow />
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className='absolute bottom-8 left-1/2 transform -translate-x-1/2'>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className='w-6 h-10 border-2 border-white/60 rounded-full flex justify-center p-2'>
            <motion.div className='w-1 h-1 bg-white/60 rounded-full' />
          </motion.div>
        </motion.div>
      </section>

      {/* Quick Links Section */}
      <section className='py-20 bg-gradient-to-b from-muted/80 to-muted'>
        <QuickLinks />
      </section>
    </div>
  );
};

export default HomeContent;
