'use client'

import { Card } from "@/components/ui/card";
import {
  BookOpenText,
  GraduationCap,
  Users,
  Clock,
  Calendar,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

interface ProgramDetail {
  title: string;
  duration: string;
  format: string;
  credits: number;
  intake: string;
}

interface FacultyMember {
  name: string;
  position: string;
  research: string;
  image: string;
}

export default function MastersPage() {
  const programDetails: ProgramDetail = {
    title: "Master of Science Programs",
    duration: "18-24 Months",
    format: "Full-time/Part-time",
    credits: 90,
    intake: "September 2024",
  };

  const specializations = [
    "Computer Science",
    "Data Analytics",
    "Renewable Energy",
    "Public Health",
  ];

  const curriculum = {
    year1: ["Research Methods", "Core Discipline Courses", "Electives"],
    year2: ["Specialization Courses", "Thesis Research", "Internship"],
  };

  const faculty: FacultyMember[] = [
    {
      name: "Dr. Ada Lovelace",
      position: "Professor of Computer Science",
      research: "AI & Machine Learning",
      image: "/faculty/ada.jpg",
    },
    // Add more faculty members
  ];

  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12 '>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Program Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>{programDetails.title}</h1>
          <div className='flex justify-center gap-4 text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Clock className='w-4 h-4' />
              <span>{programDetails.duration}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Users className='w-4 h-4' />
              <span>{programDetails.format}</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Program Overview */}
          <div className='lg:col-span-2 space-y-8'>
            <Card className='p-6'>
              <h2 className='text-2xl font-semibold mb-4'>Program Overview</h2>
              <p className='mb-6'>
                Advanced study combining theoretical knowledge with practical
                application...
              </p>

              <div className='grid md:grid-cols-2 gap-4'>
                <div className='flex items-center gap-2'>
                  <BookOpenText className='text-primary' />
                  <span>{programDetails.credits} Credit Hours</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Calendar className='text-primary' />
                  <span>Next Intake: {programDetails.intake}</span>
                </div>
              </div>
            </Card>

            {/* Specializations */}
            <Card className='p-6'>
              <h2 className='text-2xl font-semibold mb-4'>Specializations</h2>
              <div className='grid md:grid-cols-2 gap-4'>
                {specializations.map((spec) => (
                  <div
                    key={spec}
                    className='flex items-center gap-2 p-3 bg-muted rounded-lg'>
                    <GraduationCap className='text-primary' />
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Curriculum Tabs */}
            <Tabs defaultValue='year1'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='year1'>Year 1</TabsTrigger>
                <TabsTrigger value='year2'>Year 2</TabsTrigger>
              </TabsList>
              <TabsContent value='year1'>
                <Card className='p-6'>
                  <ul className='space-y-2'>
                    {curriculum.year1.map((course) => (
                      <li key={course} className='flex items-center gap-2'>
                        <span className='text-primary'>•</span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value='year2'>
                <Card className='p-6'>
                  <ul className='space-y-2'>
                    {curriculum.year2.map((course) => (
                      <li key={course} className='flex items-center gap-2'>
                        <span className='text-primary'>•</span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className='space-y-8'>
            <Card className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>
                Admission Requirements
              </h2>
              <ul className='space-y-2'>
                <li>Bachelor&apos;s degree in relevant field</li>
                <li>Minimum GPA 3.0</li>
                <li>Statement of Purpose</li>
                <li>2 Letters of Recommendation</li>
              </ul>
              <Button className='w-full mt-4'>Apply Now</Button>
            </Card>

            <Card className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>Featured Faculty</h2>
              <div className='space-y-4'>
                {faculty.map((member) => (
                  <div key={member.name} className='flex items-center gap-4'>
                    <Image
                      width={20}
                      height={20}
                      src={member.image}
                      alt={member.name}
                      className='w-12 h-12 rounded-full object-cover'
                    />
                    <div>
                      <h3 className='font-medium'>{member.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {member.position}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
