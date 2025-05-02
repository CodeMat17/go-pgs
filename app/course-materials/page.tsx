"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

// Define valid types
type Faculty = (typeof validFaculties)[number];
type CourseLevel = (typeof validCourseLevels)[number];

const validFaculties = [
  "Faculty of Arts",
  "Faculty of Education",
  "Faculty of Mgt. & Social Sciences",
  "Faculty of Nat. Science & Environmental Studies",
  "Faculty of Law",
] as const;

const validCourseLevels = ["pgd", "masters", "phd"] as const;

interface StudentData {
  name: string;
  faculty: Faculty;
  type: CourseLevel;
}

export default function CourseMaterials() {
  const [regNumber, setRegNumber] = useState("");
  const [searchTrigger, setSearchTrigger] = useState<string | null>(null);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Student query
  const studentQuery = useQuery(
    api.students.getStudentByRegno,
    searchTrigger ? { regno: searchTrigger } : "skip"
  );

     const downloadFile = useMutation(api.materials.downloadFile);

  // Materials query
  const materialsQuery = useQuery(
    api.materials.getMaterialsByFacultyType,
    studentData
      ? {
          faculty: studentData.faculty,
          type: studentData.type,
        }
      : "skip"
  );

  const isStudentLoading = useMemo(
    () => studentQuery === undefined && searchTrigger !== null,
    [studentQuery, searchTrigger]
  );

  const isMaterialsLoading = useMemo(
    () => materialsQuery === undefined && studentData !== null,
    [materialsQuery, studentData]
  );

  const isLoading = isStudentLoading || isMaterialsLoading;

  // Handle student data validation
  useEffect(() => {
    if (studentQuery === undefined) return;
    setError(null); // Reset error on new query

    if (studentQuery === null) {
      setStudentData(null);
      setError("Student not found with this registration number");
      return;
    }

    const isValidFaculty = validFaculties.includes(
      studentQuery.faculty as Faculty
    );
    const isValidCourseLevel = validCourseLevels.includes(
      studentQuery.type as CourseLevel
    );

    if (isValidFaculty && isValidCourseLevel) {
      setStudentData({
        name: studentQuery.name,
        faculty: studentQuery.faculty,
        type: studentQuery.type,
      });
    } else {
      setStudentData(null);
      setError("Invalid student data format from server");
    }
  }, [studentQuery]);

  // Handle materials errors
  useEffect(() => {
    if (materialsQuery === null) {
      setError("Failed to load course materials");
    }
  }, [materialsQuery]);
    
     const handleDownload = async (
       storageId: Id<"_storage">,
       title: string
     ) => {
       try {
         const url = await downloadFile({ storageId });
         const response = await fetch(url);
         const blob = await response.blob();

         const link = document.createElement("a");
         link.href = window.URL.createObjectURL(blob);
         link.download = `${title}.pdf`;
         link.click();
       } catch (error) {
         console.error("Download failed:", error);
       }
     };

  return (
    <div className='max-w-4xl mx-auto px-4 py-12 space-y-8 min-h-[calc(100vh-8rem)]'>
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='text-center space-y-2'>
        <h1 className='text-3xl font-bold'>Get Your Course Materials</h1>
        <p className='text-muted-foreground'>
          Enter your registration number to access your course materials
        </p>
      </motion.header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSearchTrigger(regNumber.trim());
        }}
        className='flex gap-2 max-w-xl mx-auto'>
        <Input
          value={regNumber}
          onChange={(e) => setRegNumber(e.target.value)}
          placeholder='Enter registration number'
          className='py-6 text-lg focus-visible:ring-2 focus-visible:ring-primary/50'
          aria-label='Registration number input'
        />
        <Button
          type='submit'
          className='py-6 px-8 text-lg flex gap-2 transition-all'
          disabled={!regNumber.trim() || isLoading}
          aria-busy={isLoading}>
          <Search className='w-5 h-5' />
          {isLoading ? (
            <span className='animate-pulse'>Searching...</span>
          ) : (
            "Search"
          )}
        </Button>
      </form>

      {/* Error messages */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center text-destructive p-4 bg-destructive/10 rounded-lg'>
          {error}
        </motion.div>
      )}

      {isLoading && (
        <div className='grid md:grid-cols-2 xl:grid-cols-4 gap-4'>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className='h-48 w-full rounded-xl' />
          ))}
        </div>
      )}

      {studentData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className='space-y-6'>
          <div className='bg-accent/50 p-4 rounded-lg'>
            <h2 className='text-xl font-semibold'>Student Information</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-2'>
              <div>
                <p className='text-muted-foreground'>Name</p>
                <p className='font-medium'>{studentData.name}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Faculty</p>
                <p className='font-medium'>{studentData.faculty}</p>
              </div>
              <div>
                <p className='text-muted-foreground'>Program</p>
                <p className='font-medium'>{studentData.type.toUpperCase()}</p>
              </div>
            </div>
          </div>

          {materialsQuery?.length === 0 ? (
            <p className='text-center text-muted-foreground mt-8'>
              No materials available for your program
            </p>
          ) : (
            <div className='space-y-4'>
              <h3 className='text-xl font-semibold'>Available Course Materials</h3>
              <div className='grid gap-4 md:grid-cols-2'>
                {materialsQuery?.map((material, index) => (
                  <motion.div
                    key={material._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}>
                    <Card className='p-4 hover:shadow-lg transition-shadow'>
                      <div className='flex justify-between items-start'>
                        <div>
                          <p className='text-muted-foreground text-sm mb-2'>
                            {material.faculty} • {material.type.toUpperCase()}
                          </p>
                          <h4 className='text-lg font-medium'>
                            {material.title}
                          </h4>
                          <p className='text-muted-foreground mt-2'>
                            {material.description}
                          </p>
                        </div>
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() =>
                            handleDownload(material.file, material.title)
                          }>
                          Download PDF
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
