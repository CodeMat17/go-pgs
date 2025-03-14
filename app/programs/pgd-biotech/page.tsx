"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  Clock,
  GraduationCap,
  FlaskConical,
  Download,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { motion } from "framer-motion";

export default function PgdBiotechPage() {
  return (
    <div className='w-full max-w-5xl mx-auto px-4 py-8 sm:py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Hero Section */}
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4'>
            Postgraduate Diploma in Biotechnology
          </h1>
          <div className='flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 text-sm sm:text-base text-muted-foreground'>
            <div className='flex items-center justify-center gap-1'>
              <Calendar className='w-4 h-4' />
              <span>12 Months</span>
            </div>
            <div className='flex items-center justify-center gap-1'>
              <Clock className='w-4 h-4' />
              <span>Admissions Open</span>
            </div>
            <div className='flex items-center justify-center gap-1'>
              <GraduationCap className='w-4 h-4' />
              <span>Full-time & Part-time</span>
            </div>
          </div>
        </div>

        {/* Program Details */}
        <div className='grid gap-6 lg:grid-cols-[1fr_350px] xl:grid-cols-[1fr_400px]'>
          {/* Main Content */}
          <div className='space-y-6'>
            {/* Why Choose Us */}
            <Card className='p-4 sm:p-6'>
              <h2 className='text-xl sm:text-2xl font-semibold mb-3 sm:mb-4 flex items-center gap-2'>
                <FlaskConical className='w-5 h-5 sm:w-6 sm:h-6 text-primary' />
                Why Choose Our PGD Biotechnology?
              </h2>
              <div className='space-y-3 sm:space-y-4'>
                {[
                  {
                    title: "Cutting-Edge Facilities",
                    description:
                      "Access to state-of-the-art labs and research equipment",
                  },
                  {
                    title: "Industry-Aligned Curriculum",
                    description:
                      "Designed with input from leading biotech companies",
                  },
                  {
                    title: "Expert Faculty",
                    description:
                      "Learn from distinguished professors and industry professionals",
                  },
                  {
                    title: "Research Opportunities",
                    description: "Participate in ongoing research projects",
                  },
                  {
                    title: "Career Development",
                    description:
                      "Strong industry connections and career services",
                  },
                ].map((item, index) => (
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
              <div className='space-y-3 sm:space-y-4 text-muted-foreground text-sm sm:text-base'>
                <p>
                  Our Postgraduate Diploma in Biotechnology is an intensive
                  12-month program designed to provide advanced theoretical
                  knowledge and practical skills in modern biotechnology.
                </p>
                <p>
                  The curriculum covers essential areas including molecular
                  biology, genetic engineering, bioprocess technology, and
                  bioinformatics.
                </p>
                <ul className='list-disc pl-6 space-y-2'>
                  <li>Comprehensive coverage of biotechnological concepts</li>
                  <li>Practical training in laboratory techniques</li>
                  <li>Industry visits and guest lectures</li>
                  <li>Interdisciplinary research projects</li>
                </ul>
              </div>
            </Card>

            {/* Program Structure */}
            <Tabs defaultValue='core'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='core'>Core Modules</TabsTrigger>
                <TabsTrigger value='electives'>Electives</TabsTrigger>
              </TabsList>
              <TabsContent value='core'>
                <Card className='p-4 sm:p-6'>
                  <ul className='space-y-2 text-sm sm:text-base'>
                    <li>Molecular Biology Techniques</li>
                    <li>Biostatistics</li>
                    <li>Genetic Engineering</li>
                    <li>Bioprocess Technology</li>
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value='electives'>
                <Card className='p-4 sm:p-6'>
                  <ul className='space-y-2 text-sm sm:text-base'>
                    <li>Bioinformatics</li>
                    <li>Nanobiotechnology</li>
                    <li>Industrial Biotechnology</li>
                    <li>Environmental Biotechnology</li>
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className='space-y-6'>
            {/* Application CTA */}
            <Card className='p-4 sm:p-6 bg-[#FEDA37]/90'>
              <h2 className='text-lg sm:text-xl font-semibold mb-3 sm:mb-4'>
                Start Your Application
              </h2>
              <div className='space-y-3'>
                <Button className='w-full text-sm sm:text-base' asChild>
                  <a href='#apply-now'>Apply Online</a>
                </Button>
                <Button
                  variant='outline'
                  className='w-full text-sm sm:text-base'
                  asChild>
                  <a href='/downloads/pgd-biotech-application.pdf' download>
                    <Download className='mr-2 h-4 w-4' />
                    Download Application
                  </a>
                </Button>
              </div>
            </Card>

            {/* Key Facts */}
            <Card className='p-4 sm:p-6'>
              <h2 className='text-lg sm:text-xl font-semibold mb-3 sm:mb-4'>
                Key Facts
              </h2>
              <div className='space-y-3 text-sm sm:text-base'>
                <div className='flex items-center gap-2'>
                  <Calendar className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
                  <span>Next Intake: September 2025</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
                  <span>Duration: 12 Months</span>
                </div>
                <div className='flex items-center gap-2'>
                  <GraduationCap className='w-4 h-4 sm:w-5 sm:h-5 text-primary' />
                  <span>Mode: Full-time & Part-time</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Application Form */}
        {/* <section id='apply-now' className='mt-12 sm:mt-16'>
          <h2 className='text-xl sm:text-2xl font-semibold mb-6 sm:mb-8'>
            Online Application
          </h2>
          <Card className='p-4 sm:p-6'>
            <form className='space-y-4 sm:space-y-6'>
              <div className='grid gap-4 sm:gap-6 md:grid-cols-2'>
                <div className='space-y-2'>
                  <label className='text-sm sm:text-base'>Full Name</label>
                  <Input className='text-sm sm:text-base' />
                </div>
                <div className='space-y-2'>
                  <label className='text-sm sm:text-base'>Email</label>
                  <Input type='email' className='text-sm sm:text-base' />
                </div>
              </div>
              <Button type='submit' className='w-full text-sm sm:text-base'>
                Submit Application
              </Button>
            </form>
          </Card>
        </section> */}
      </motion.div>
    </div>
  );
}
