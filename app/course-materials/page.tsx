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
import { toast } from "sonner";

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

type Material = {
  _id: Id<"materials">;
  _creationTime: number;
  faculty: Faculty;
  type: CourseLevel;
  title: string;
  semester: 1 | 2;
  description: string;
  file: Id<"_storage">;
};

type GPCMaterial = {
  _id: Id<"gpc">;
  _creationTime: number;
  faculty: Faculty;
  type: CourseLevel;
  title: string;
  semester: 1 | 2;
  description: string;
  file: Id<"_storage">;
  downloads: number;
};

interface StudentData {
  name: string;
  faculty: Faculty;
  type: CourseLevel;
}

type MaterialGroup<T> = {
  first: T[];
  second: T[];
};

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

  // Materials queries
  const materialsQuery = useQuery(
    api.materials.getMaterialsByFacultyType,
    studentData
      ? {
          faculty: studentData.faculty,
          type: studentData.type,
        }
      : "skip"
  );

  const gpcQuery = useQuery(
    api.gpc.getGPCByFacultyType,
    studentData
      ? {
          faculty: studentData.faculty,
          type: studentData.type,
        }
      : "skip"
  );

  // Group materials by semester with proper type validation
  const isValidSemester = (sem: unknown): sem is 1 | 2 =>
    sem === 1 || sem === 2;

  // Group materials by semester
 const materials = useMemo<MaterialGroup<Material>>(
   () => ({
     first: (materialsQuery ?? []).filter(
       (m): m is Material => isValidSemester(m.semester) && m.semester === 1
     ),
     second: (materialsQuery ?? []).filter(
       (m): m is Material => isValidSemester(m.semester) && m.semester === 2
     ),
   }),
   [materialsQuery]
 );

 const gpcMaterials = useMemo<MaterialGroup<GPCMaterial>>(
   () => ({
     first: (gpcQuery ?? []).filter(
       (m): m is GPCMaterial => isValidSemester(m.semester) && m.semester === 1
     ),
     second: (gpcQuery ?? []).filter(
       (m): m is GPCMaterial => isValidSemester(m.semester) && m.semester === 2
     ),
   }),
   [gpcQuery]
 );

  // Loading states
  const isStudentLoading = useMemo(
    () => studentQuery === undefined && searchTrigger !== null,
    [studentQuery, searchTrigger]
  );

  const isLoading =
    isStudentLoading ||
    (studentData && materialsQuery === undefined) ||
    (studentData && gpcQuery === undefined);

  // Handle student data validation
 useEffect(() => {
   if (studentQuery === undefined) return;
   setError(null);

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
     setError("Invalid student data format from server");
   }
 }, [studentQuery]);

  // Download functionality
  const downloadFile = useMutation(api.materials.downloadFile);
  const trackGpcDownload = useMutation(api.gpc.trackDownload);

  const handleDownload = async (
    storageId: Id<"_storage">,
    title: string,
    materialId?: Id<"gpc">
  ) => {
    try {
      // Get download URL
      const url = await downloadFile({ storageId });

      // Trigger download
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = `${title}.pdf`;
      link.click();

      // Track GPC download if applicable
      if (materialId) {
        await trackGpcDownload({ materialId });
      }
    } catch (error) {
      console.error("Download failed:", error);
      toast.error("Download failed. Please try again.");
    }
  };

  return (
    <div className='w-full min-h-screen bg-gray-50 dark:bg-gray-950'>
      <div className='max-w-4xl mx-auto px-4 py-12 space-y-8'>
        {/* Search Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center space-y-2'>
          <h1 className='text-3xl font-bold'>Course Materials Portal</h1>
          <p className='text-muted-foreground'>
            Enter your registration number to access your learning resources
          </p>
        </motion.header>

        {/* Search Form */}
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
            className='py-6 text-lg bg-white dark:bg-gray-900 shadow-md'
            aria-label='Registration number'
          />
          <Button
            type='submit'
            className='py-6 px-8 text-lg gap-2'
            disabled={!regNumber.trim() || isLoading ? true : undefined}>
            <Search className='w-5 h-5' />
            {isLoading ? "Searching..." : "Search"}
          </Button>
        </form>

        {/* Error Display */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center text-destructive p-4 bg-destructive/10 rounded-lg'>
            {error}
          </motion.div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className='grid md:grid-cols-2 gap-4'>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className='h-32 rounded-xl' />
            ))}
          </div>
        )}

        {/* Student Dashboard */}
        {studentData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='space-y-8'>
            {/* Student Info Card */}
            <Card className='p-6 bg-muted/50'>
              <h2 className='text-xl font-semibold mb-4'>Student Profile</h2>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
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
                  <p className='font-medium'>
                    {studentData.type.toUpperCase()}
                  </p>
                </div>
              </div>
            </Card>

            {/* GPC Materials Section */}
            {gpcMaterials.first.length > 0 || gpcMaterials.second.length > 0 ? (
              <section className='space-y-6 bg-sky-100 dark:bg-sky-700/20 p-6 rounded-lg'>
                <h2 className='text-2xl font-semibold text-primary'>
                  GPC Resources
                </h2>

                {gpcMaterials.first.length > 0 && (
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>First Semester</h3>
                    <div className='grid gap-4 md:grid-cols-2'>
                      {gpcMaterials.first.map((material, index) => (
                        <MaterialCard
                          key={material._id}
                          material={material}
                          index={index}
                          bgColor='gpc'
                          onDownload={() =>
                            handleDownload(
                              material.file,
                              material.title,
                              material._id
                            )
                          }
                          downloads={material.downloads}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {gpcMaterials.second.length > 0 && (
                  <div className='space-y-4'>
                    <h3 className='text-lg font-medium'>Second Semester</h3>
                    <div className='grid gap-4 md:grid-cols-2'>
                      {gpcMaterials.second.map((material, index) => (
                        <MaterialCard
                          key={material._id}
                          material={material}
                          index={index}
                          bgColor='gpc'
                          onDownload={() =>
                            handleDownload(
                              material.file,
                              material.title,
                              material._id
                            )
                          }
                          downloads={material.downloads}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ) : (
              <p className='text-center py-10 text-muted-foreground'>
                No GPC course loaded at the moment.
              </p>
            )}

            {/* Course Materials Section */}
            <section className='space-y-6'>
              <h2 className='text-2xl font-semibold text-primary'>
                Course Materials
              </h2>

              {materials.first.length === 0 && materials.second.length === 0 ? (
                <div className='text-center py-8 text-muted-foreground'>
                  No materials available for your program
                </div>
              ) : (
                <>
                  {materials.first.length > 0 && (
                    <div className='space-y-4'>
                      <h3 className='text-lg font-medium'>First Semester</h3>
                      <div className='grid gap-4 md:grid-cols-2'>
                        {materials.first.map((material, index) => (
                          <MaterialCard
                            key={material._id}
                            material={material}
                            index={index}
                            bgColor='material'
                            onDownload={() =>
                              handleDownload(material.file, material.title)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {materials.second.length > 0 && (
                    <div className='space-y-4'>
                      <h3 className='text-lg font-medium'>Second Semester</h3>
                      <div className='grid gap-4 md:grid-cols-2'>
                        {materials.second.map((material, index) => (
                          <MaterialCard
                            key={material._id}
                            material={material}
                            index={index}
                            bgColor='material'
                            onDownload={() =>
                              handleDownload(material.file, material.title)
                            }
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </section>
          </motion.div>
        )}
      </div>
    </div>
  );
}

function MaterialCard({
  material,
  index,
  onDownload,
  downloads,
  bgColor,
}: {
  material: { title: string; description: string; file: Id<"_storage"> };
  index: number;
  onDownload?: () => void;
    downloads?: number;
  bgColor: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}>
      <Card
        className={`p-4 hover:shadow-lg transition-shadow ${bgColor === "gpc" ? "bg-sky-50 dark:bg-sky-600/20" : "bg-gradient-to-tr from-transparent to-sky-300 dark:bg-muted/50"}`}>
        <div className='flex flex-col justify-between h-full gap-2'>
          <div>
            <h3 className='font-medium text-lg'>{material.title}</h3>
            <p className='text-muted-foreground text-sm'>
              {material.description}
            </p>
          </div>

          <div className='flex justify-between items-center mt-2'>
            {downloads !== undefined && (
              <span className='text-sm text-muted-foreground'>
                {downloads} downloads
              </span>
            )}
            {onDownload && (
              <Button
                variant='outline'
                size='sm'
                onClick={onDownload}
                className='ml-auto'>
                Download PDF
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
