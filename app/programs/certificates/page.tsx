'use client'

import { Card } from "@/components/ui/card";
import {
  Briefcase,
  Clock,
  TrendingUp,
  Users,
  CheckCircle,
  BookOpen,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
// import Link from "next/link";

interface CertificateProgram {
  title: string;
  duration: string;
  format: string;
  skills: string[];
  industryPartners: string[];
}

interface CourseStructure {
  core: string[];
  electives: string[];
}

export default function CertificatesPage() {
  const programs: CertificateProgram[] = [
    {
      title: "Data Science Certification",
      duration: "6 Months",
      format: "Online + Workshops",
      skills: ["Python", "Machine Learning", "Data Visualization"],
      industryPartners: ["Tech Corp", "Data Insights Ltd", "AI Solutions"],
    },
    {
      title: "Digital Marketing Certification",
      duration: "4 Months",
      format: "100% Online",
      skills: ["SEO", "Social Media Strategy", "Content Marketing"],
      industryPartners: ["Digital Agency Co", "Market Masters", "Web Warriors"],
    },
  ];

  const curriculum: CourseStructure = {
    core: [
      "Foundations of Data Analysis",
      "Statistical Methods",
      "Programming Basics",
    ],
    electives: [
      "Advanced Visualization Techniques",
      "Big Data Management",
      "Machine Learning Applications",
    ],
  };

  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Program Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>
            Professional Certificate Programs
          </h1>
          <div className='flex justify-center gap-4 text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Clock className='w-4 h-4' />
              <span>Short-term Programs</span>
            </div>
            <div className='flex items-center gap-1'>
              <TrendingUp className='w-4 h-4' />
              <span>Career-focused Learning</span>
            </div>
          </div>
        </div>

        {/* Program Cards */}
        <div className='grid md:grid-cols-2 gap-6 mb-12'>
          {programs.map((program, index) => (
            <motion.div
              key={program.title}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}>
              <Card className='p-6 h-full'>
                <div className='flex items-center gap-4 mb-4'>
                  <Briefcase className='w-8 h-8 text-primary' />
                  <h2 className='text-2xl font-semibold'>{program.title}</h2>
                </div>

                <div className='grid gap-4'>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-5 h-5 text-muted-foreground' />
                    <span>{program.duration}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <Users className='w-5 h-5 text-muted-foreground' />
                    <span>{program.format}</span>
                  </div>
                </div>

                <div className='my-6'>
                  <h3 className='font-medium mb-2'>Key Skills:</h3>
                  <div className='flex flex-wrap gap-2'>
                    {program.skills.map((skill) => (
                      <span
                        key={skill}
                        className='px-3 py-1 bg-muted rounded-full text-sm'>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className='mt-auto'>
                  <h3 className='font-medium mb-2'>Industry Recognized By:</h3>
                  <div className='flex flex-wrap gap-2'>
                    {program.industryPartners.map((partner) => (
                      <span
                        key={partner}
                        className='px-3 py-1 border rounded-full text-sm'>
                        {partner}
                      </span>
                    ))}
                  </div>
                </div>

                <Button className='w-full mt-6'>Enroll Now</Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Program Details */}
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Main Content */}
          <div className='lg:col-span-2 space-y-8'>
            <Card className='p-6'>
              <h2 className='text-2xl font-semibold mb-4'>
                Program Highlights
              </h2>
              <div className='grid md:grid-cols-2 gap-6'>
                <div className='flex items-start gap-4'>
                  <CheckCircle className='w-6 h-6 text-primary mt-1' />
                  <div>
                    <h3 className='font-medium mb-2'>Stackable Credentials</h3>
                    <p>Combine multiple certificates toward degree programs</p>
                  </div>
                </div>
                <div className='flex items-start gap-4'>
                  <BookOpen className='w-6 h-6 text-primary mt-1' />
                  <div>
                    <h3 className='font-medium mb-2'>Flexible Learning</h3>
                    <p>Self-paced online modules with live mentorship</p>
                  </div>
                </div>
              </div>
            </Card>

            <Tabs defaultValue='core'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='core'>Core Courses</TabsTrigger>
                <TabsTrigger value='electives'>Electives</TabsTrigger>
              </TabsList>
              <TabsContent value='core'>
                <Card className='p-6'>
                  <ul className='space-y-2'>
                    {curriculum.core.map((course) => (
                      <li key={course} className='flex items-center gap-2'>
                        <span className='text-primary'>•</span>
                        {course}
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value='electives'>
                <Card className='p-6'>
                  <ul className='space-y-2'>
                    {curriculum.electives.map((course) => (
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
                Why Choose Certificates?
              </h2>
              <div className='space-y-4'>
                <div className='flex items-center gap-2'>
                  <Clock className='w-5 h-5 text-primary' />
                  <span>Short Duration (3-6 months)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <TrendingUp className='w-5 h-5 text-primary' />
                  <span>Immediate Career Application</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='w-5 h-5 text-primary' />
                  <span>Industry-Aligned Curriculum</span>
                </div>
              </div>
            </Card>

            <Card className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>Admission Process</h2>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <span className='text-primary'>1.</span>
                  <span>Online Application</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-primary'>2.</span>
                  <span>Immediate Enrollment</span>
                </div>
                <div className='flex items-center gap-2'>
                  <span className='text-primary'>3.</span>
                  <span>Start Learning</span>
                </div>
              </div>
              <Button className='w-full mt-4'>Begin Application</Button>
            </Card>

            <Card className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>Career Support</h2>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <Briefcase className='w-5 h-5 text-primary' />
                  <span>Career Coaching Sessions</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='w-5 h-5 text-primary' />
                  <span>Industry Networking Events</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className='w-5 h-5 text-primary' />
                  <span>Certificate Verification Portal</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
