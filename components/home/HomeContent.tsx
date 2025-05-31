"use client";

import { motion, useReducedMotion } from "framer-motion";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ApplyNow } from "../buttons/ApplyNow";
import { QuickLinks } from "../QuickLinks";

const DescriptionAnimation = dynamic(() => import("../DescriptionAnimation"), {
  ssr: false,
  loading: () => <div className='h-8' aria-hidden='true' />,
});

export default function HomeContent() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative w-full min-h-[600px] lg:min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden'>
        {/* Background Image with Gradient Overlay */}
        <motion.div
          initial={shouldReduceMotion ? {} : { scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className='absolute inset-0 z-0'>
          <Image
            src='/hero-bg.avif'
            alt='Aerial view of Godfrey Okoye University campus with modern buildings and green spaces'
            fill
            priority
            className='object-cover object-center'
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
        <div className='relative w-full z-10 max-w-6xl mx-auto px-4 flex flex-col items-center lg:items-start gap-2 md:gap-0 py-12 sm:py-16 lg:py-20'>
          {/* Text Container */}
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className='max-w-4xl lg:px-12 xl:px-0'>
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='mb-3'>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight [text-shadow:_2px_2px_8px_rgba(0,0,0,0.5)] leading-[1.15] max-w-3xl'>
                Elevate Your Academic Journey at
              </h1>
              <h1 className='text-4xl sm:text-5xl lg:text-6xl tracking-tight font-extrabold [text-shadow:_2px_2px_8px_rgba(0,0,0,0.5)] leading-[1.15] text-[#FFDC55] mt-4'>
                Godfrey Okoye University
                <span className='block text-2xl sm:text-3xl md:text-4xl xl:text-5xl mt-2 sm:mt-3 font-bold'>
                  School of Postgraduate Studies
                </span>
              </h1>
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className='backdrop-blur-sm bg-black/5 rounded-xl w-full max-w-2xl'>
              <DescriptionAnimation />
            </motion.div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className='mt-3'>
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
      <motion.section
        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className='py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-muted/80 to-muted'>
        <QuickLinks />
      </motion.section>
    </div>
  );
}
