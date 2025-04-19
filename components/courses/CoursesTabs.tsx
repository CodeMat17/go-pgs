'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PgdCourses from "../PgdCourses";
import MastersCourses from "../MastersCourses";
import PhdCourses from "../PhdCourses";

const CoursesTabs = () => {
  return (
    <div className='w-full py-12'>
      <Tabs defaultValue='pgd'>
        <TabsList className='flex flex-col sm:flex-row gap-3 w-full'>
          <TabsTrigger
            value='pgd'
            className='w-full sm:w-auto justify-start px-6 py-3 sm:py-2 rounded-lg
          border border-input bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-accent-foreground
          data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
          data-[state=active]:border-primary data-[state=active]:shadow-md
          transition-all duration-200 font-medium
          dark:border-neutral-700 dark:hover:bg-neutral-800/50
          dark:data-[state=active]:bg-primary/80 dark:data-[state=active]:border-primary-600
          dark:data-[state=active]:shadow-primary/10'>
            PGD Courses
          </TabsTrigger>

          <TabsTrigger
            value='masters'
            className='w-full sm:w-auto justify-start px-6 py-3 sm:py-2 rounded-lg
          border border-input bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-accent-foreground
          data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
          data-[state=active]:border-primary data-[state=active]:shadow-md
          transition-all duration-200 font-medium
          dark:border-neutral-700 dark:hover:bg-neutral-800/50
          dark:data-[state=active]:bg-primary/80 dark:data-[state=active]:border-primary-600
          dark:data-[state=active]:shadow-primary/10'>
            Masters Courses
          </TabsTrigger>

          <TabsTrigger
            value='phd'
            className='w-full sm:w-auto justify-start px-6 py-3 sm:py-2 rounded-lg
          border border-input bg-gray-100 dark:bg-gray-800 hover:bg-accent hover:text-accent-foreground
          data-[state=active]:bg-primary data-[state=active]:text-primary-foreground
          data-[state=active]:border-primary data-[state=active]:shadow-md
          transition-all duration-200 font-medium
          dark:border-neutral-700 dark:hover:bg-neutral-800/50
          dark:data-[state=active]:bg-primary/80 dark:data-[state=active]:border-primary-600
          dark:data-[state=active]:shadow-primary/10'>
            PhD Courses
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value='pgd'
          className='pt-8 mt-16 sm:mt-0 focus:outline-none'>
          <div className='text-foreground dark:text-neutral-200'>
            <PgdCourses />
          </div>
        </TabsContent>

        <TabsContent
          value='masters'
          className='pt-8 mt-16 sm:mt-0 focus:outline-none'>
          <div className='text-foreground dark:text-neutral-200'>
            <MastersCourses />
          </div>
        </TabsContent>

        <TabsContent
          value='phd'
          className='pt-8 mt-16 sm:mt-0 focus:outline-none'>
          <div className='text-foreground dark:text-neutral-200'>
            <PhdCourses />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CoursesTabs;
