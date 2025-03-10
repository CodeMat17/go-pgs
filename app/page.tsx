"use client";

import { ApplyNow } from "@/components/buttons/ApplyNow";
import { QuickLinks } from "@/components/QuickLinks";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className='min-h-screen'>
      {/* Hero Section */}
      <section className='relative w-full min-h-[500px] lg:h-[calc(100vh-8rem)] flex items-center justify-center overflow-hidden'>
        {/* Background Image with Gradient Overlay */}
        <div className='absolute inset-0 z-0'>
          <Image
            src='/hero-bg.avif' // Replace with your actual hero image
            alt='GO University Campus'
            fill
            priority
            className='object-cover object-center'
            quality={100}
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw'
          />
          <div className='absolute inset-0 bg-gradient-to-r from-primary/90 to-secondary/80 dark:from-black/90 dark:to-secondary/80' />
        </div>

        {/* Hero Content */}
        <div className='relative w-full z-10 px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row-reverse items-center justify-between gap-4 md:gap-0 py-7'>
          {/* Student Image Container */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='relative h-[250px] sm:h-[350px] md:h-[400px] lg:h-[500px] w-full md:w-[40%]'>
            <Image
              src='/student.avif'
              alt='Postgraduate student'
              fill
              priority
              quality={90}
              className='object-contain object-center'
              sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 500px'
            />
          </motion.div>

          {/* Text Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='md:w-[60%] text-center md:text-left lg:pl-6 xl:pl-12'>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className='text-5xl md:text-[48px] xl:text-6xl font-bold text-white mb-2 sm:mb-4 [text-shadow:_0px_2px_4px_rgba(0,0,0,25)]'>
              Elevate Your Academic Journey at
              <span className='block text-[#FEDA37]'>
                GO Postgraduate School
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className='sm:text-lg md:text-xl text-white mb-6 sm:mb-8 max-w-2xl mx-auto md:mx-0 [text-shadow:_0px_2px_4px_rgba(0,0,0,25)]'>
              Join a community of scholars pushing boundaries in research and
              innovation
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className='flex gap-3 sm:gap-4 justify-center md:justify-start'>
              <ApplyNow />

              <Button
                size='lg'
                className='text-sm xs:text-base sm:text-lg p-4 sm:p-5 md:p-6 bg-white text-gray-900'
                asChild>
                <Link href='/programs'>Explore Programs</Link>
              </Button>
              {/* <Button
                variant='ghost'
                size='lg'
                className='text-sm xs:text-base sm:text-lg p-4 sm:p-5 md:p-6 border border-gray-800 dark:border-gray-400 text-white'
                asChild>
                <Link href='/programs'>Explore Programs</Link>
              </Button> */}
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
}
