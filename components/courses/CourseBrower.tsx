"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { BookOpen, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const faculties = [
  "Faculty of Arts",
  "Faculty of Education",
  "Faculty of Mgt. & Social Sciences",
  "Faculty of Nat. Science & Environmental Studies",
  "Faculty of Law",
] as const;

type CourseLevel = "gpc" | "pgd" | "masters" | "phd";
const courseLevels: CourseLevel[] = ["gpc", "pgd", "masters", "phd"];

const levelConfig = {
  gpc: "GPC Courses",
  pgd: "PGD Courses",
  masters: "Masters Courses",
  phd: "PhD Courses",
} as const;

export default function FacultyCourseBrowser() {
  const [selectedFaculty, setSelectedFaculty] = useState<
    (typeof faculties)[number]
  >(faculties[0]);
  const [selectedProgram, setSelectedProgram] = useState<CourseLevel | "">("");

  const queryArgs =
    selectedFaculty && selectedProgram
      ? {
          faculty: selectedFaculty,
          type: selectedProgram,
        }
      : "skip";

  const courses = useQuery(api.courses.getCoursesByFaculty, queryArgs);

  const handleFacultyChange = (value: string) => {
    setSelectedFaculty(value as (typeof faculties)[number]);
    setSelectedProgram("");
  };

  return (
    <div className='space-y-8'>
      <div className='flex flex-col md:flex-row items-center justify-between gap-3'>
        <div className='w-full'>
          <label className='block mb-2 text-sm font-semibold text-muted-foreground'>
            Select Faculty
          </label>
          <Select value={selectedFaculty} onValueChange={handleFacultyChange}>
            <SelectTrigger className='w-full rounded-lg py-6 bg-white dark:bg-gray-800'>
              <SelectValue placeholder='Select faculty' />
            </SelectTrigger>
            <SelectContent>
              {faculties.map((faculty) => (
                <SelectItem key={faculty} value={faculty}>
                  {faculty}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='w-full'>
          <label className='block mb-2 text-sm font-semibold text-muted-foreground'>
            Program Type
          </label>
          <Select
            value={selectedProgram}
            onValueChange={(value: string) =>
              setSelectedProgram(value as CourseLevel)
            }
            disabled={!selectedFaculty}>
            <SelectTrigger className='w-full rounded-lg py-6 bg-white dark:bg-gray-800'>
              <SelectValue placeholder='Select a program' />
            </SelectTrigger>
            <SelectContent>
              {courseLevels.map((level) => (
                <SelectItem key={level} value={level}>
                  {levelConfig[level]}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {!selectedProgram ? (
        selectedFaculty && (
          <p className='text-center text-muted-foreground my-20'>
            Select a program type
          </p>
        )
      ) : !courses ? (
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className='h-48 w-full rounded-xl' />
          ))}
        </div>
      ) : courses.length === 0 ? (
        <p className='text-center text-muted-foreground mt-16'>
          No {levelConfig[selectedProgram].toLowerCase()} available.
        </p>
      ) : (
        <motion.div
          className='space-y-6'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}>
          <h2 className='text-2xl font-bold'>{levelConfig[selectedProgram]}</h2>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>  {courses.map((course) => (
            <motion.div
              key={course._id}
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}>
              <Card className='p-4 hover:shadow-lg transition-shadow'>
                <div className='space-y-3'>
                  <h3 className='font-medium text-lg'>{course.course}</h3>
                  <div className='space-y-2 text-muted-foreground'>
                    <div className='flex items-center gap-2'>
                      <Clock className='w-4 h-4 text-amber-500' />
                      <span>{course.duration}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <BookOpen className='w-4 h-4 text-blue-500' />
                      <span>{course.mode}</span>
                    </div>
                  </div>
                  <Link href={`/courses/${course.slug}`} className='block'>
                    <Button
                      variant='outline'
                      className='w-full mt-2 hover:bg-accent/90 transition-colors'>
                      Learn More
                    </Button>
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}</div>
        
                
        </motion.div>
      )}
    </div>
  );
}
