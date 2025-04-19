"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";

// Lazy load course components with proper fallback
const PgdCourses = dynamic(() => import("../PgdCourses"), {
  loading: () => (
    <div className='h-64 w-full bg-muted animate-pulse rounded-lg' />
  ),
  ssr: false,
});

const MastersCourses = dynamic(() => import("../MastersCourses"), {
  loading: () => (
    <div className='h-64 w-full bg-muted animate-pulse rounded-lg' />
  ),
  ssr: false,
});

const PhdCourses = dynamic(() => import("../PhdCourses"), {
  loading: () => (
    <div className='h-64 w-full bg-muted animate-pulse rounded-lg' />
  ),
  ssr: false,
});

const CoursesTabs = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className='w-full py-12' role='region' aria-label='Course Programs'>
      <Tabs defaultValue='pgd'>
        <TabsList
          className='flex flex-col sm:flex-row gap-2 w-full'
          aria-label='Select course program type'>
          <TabsTrigger
            value='pgd'
            className='w-full sm:w-auto justify-start px-6 py-4 sm:py-3 rounded-lg
            border border-input bg-background hover:bg-accent hover:text-accent-foreground
            data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
            data-[state=active]:border-primary data-[state=active]:shadow-sm
            transition-colors duration-150 font-semibold
            dark:border-neutral-700 dark:hover:bg-neutral-800/50
            dark:data-[state=active]:bg-primary dark:data-[state=active]:border-primary-600
            focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:outline-none
            motion-reduce:transition-none'
            role='tab'
            aria-controls='pgd-content'>
            PGD Courses
          </TabsTrigger>

          <TabsTrigger
            value='masters'
            className='w-full sm:w-auto justify-start px-6 py-4 sm:py-3 rounded-lg
            border border-input bg-background hover:bg-accent hover:text-accent-foreground
            data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
            data-[state=active]:border-primary data-[state=active]:shadow-sm
            transition-colors duration-150 font-semibold
            dark:border-neutral-700 dark:hover:bg-neutral-800/50
            dark:data-[state=active]:bg-primary dark:data-[state=active]:border-primary-600
            focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:outline-none
            motion-reduce:transition-none'
            role='tab'
            aria-controls='masters-content'>
            Masters Courses
          </TabsTrigger>

          <TabsTrigger
            value='phd'
            className='w-full sm:w-auto justify-start px-6 py-4 sm:py-3 rounded-lg
            border border-input bg-background hover:bg-accent hover:text-accent-foreground
            data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
            data-[state=active]:border-primary data-[state=active]:shadow-sm
            transition-colors duration-150 font-semibold
            dark:border-neutral-700 dark:hover:bg-neutral-800/50
            dark:data-[state=active]:bg-primary dark:data-[state=active]:border-primary-600
            focus-visible:ring-2 focus-visible:ring-primary/80 focus-visible:outline-none
            motion-reduce:transition-none'
            role='tab'
            aria-controls='phd-content'>
            PhD Courses
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value='pgd'
          id='pgd-content'
          className='pt-6 mt-16 sm:mt-12 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80'
          role='tabpanel'
          tabIndex={0}>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <PgdCourses />
          </motion.div>
        </TabsContent>

        <TabsContent
          value='masters'
          id='masters-content'
          className='pt-6  mt-16 sm:mt-12  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80'
          role='tabpanel'
          tabIndex={0}>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <MastersCourses />
          </motion.div>
        </TabsContent>

        <TabsContent
          value='phd'
          id='phd-content'
          className='pt-6  mt-16 sm:mt-12  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/80'
          role='tabpanel'
          tabIndex={0}>
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}>
            <PhdCourses />
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesTabs;
