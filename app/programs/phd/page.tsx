'use client'

import { Card } from "@/components/ui/card";
import {
  Microscope,
  BookOpenText,
  Users,
  Award,
  Calendar,
  FileText,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ProgramDetail {
  title: string;
  duration: string;
  format: string;
  intake: string;
  researchAreas: string[];
}

interface FacultyMember {
  name: string;
  position: string;
  research: string;
  image: string;
  publications: number;
}

export default function PhdPage() {
  const programDetails: ProgramDetail = {
    title: "Doctor of Philosophy (PhD) Programs",
    duration: "3-5 Years",
    format: "Full-time Research",
    intake: "Rolling Admissions",
    researchAreas: [
      "Artificial Intelligence",
      "Sustainable Energy",
      "Biomedical Engineering",
      "Social Sciences",
    ],
  };

  const researchPhases = {
    phase1: [
      "Research Proposal",
      "Literature Review",
      "Methodology Development",
    ],
    phase2: [
      "Data Collection",
      "Analysis & Implementation",
      "Initial Findings",
    ],
    phase3: ["Thesis Writing", "Final Defense", "Publication Preparation"],
  };

  const faculty: FacultyMember[] = [
    {
      name: "Dr. Alan Turing",
      position: "Professor of Computer Science",
      research: "Computational Theory & AI",
      image: "/faculty/turing.jpg",
      publications: 87,
    },
    // Add more faculty members
  ];

  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Program Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>{programDetails.title}</h1>
          <div className='flex justify-center gap-4 text-muted-foreground'>
            <div className='flex items-center gap-1'>
              <Calendar className='w-4 h-4' />
              <span>{programDetails.duration}</span>
            </div>
            <div className='flex items-center gap-1'>
              <Users className='w-4 h-4' />
              <span>{programDetails.format}</span>
            </div>
          </div>
        </div>

        {/* Download button */}
        {/* <Button variant='outline' className='mt-4'>
          <FileText className='mr-2 h-4 w-4' />
          Download Proposal Template (PDF)
        </Button> */}

        {/* Main Content */}
        <div className='grid lg:grid-cols-3 gap-8'>
          {/* Program Overview */}
          <div className='lg:col-span-2 space-y-8'>
            <Card className='p-6'>
              <h2 className='text-2xl font-semibold mb-4'>
                Research Focus Areas
              </h2>
              <div className='grid md:grid-cols-2 gap-4'>
                {programDetails.researchAreas.map((area) => (
                  <div
                    key={area}
                    className='flex items-center gap-2 p-3 bg-muted rounded-lg'>
                    <Microscope className='text-primary' />
                    <span>{area}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Research Timeline */}
            <Tabs defaultValue='phase1'>
              <TabsList className='grid w-full grid-cols-3'>
                <TabsTrigger value='phase1'>Phase 1</TabsTrigger>
                <TabsTrigger value='phase2'>Phase 2</TabsTrigger>
                <TabsTrigger value='phase3'>Phase 3</TabsTrigger>
              </TabsList>
              <TabsContent value='phase1'>
                <Card className='p-6'>
                  <ul className='space-y-2'>
                    {researchPhases.phase1.map((item) => (
                      <li key={item} className='flex items-center gap-2'>
                        <span className='text-primary'>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value='phase2'>
                <Card className='p-6'>
                  <ul className='space-y-2'>
                    {researchPhases.phase2.map((item) => (
                      <li key={item} className='flex items-center gap-2'>
                        <span className='text-primary'>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
              <TabsContent value='phase3'>
                <Card className='p-6'>
                  <ul className='space-y-2'>
                    {researchPhases.phase3.map((item) => (
                      <li key={item} className='flex items-center gap-2'>
                        <span className='text-primary'>•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </Card>
              </TabsContent>
            </Tabs>

            {/* Funding Section */}
            <Card className='p-6'>
              <h2 className='text-2xl font-semibold mb-4'>
                Funding Opportunities
              </h2>
              <div className='grid md:grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <Award className='text-primary' />
                    <h3 className='font-medium'>Scholarships</h3>
                  </div>
                  <p className='text-sm'>
                    Full and partial tuition waivers available
                  </p>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <FileText className='text-primary' />
                    <h3 className='font-medium'>Research Grants</h3>
                  </div>
                  <p className='text-sm'>Annual funding up to $20,000</p>
                </div>
              </div>
              <Button className='mt-4'>View Funding Options</Button>
            </Card>
          </div>

       

          {/* Sidebar */}
          <div className='space-y-8'>
            <Card className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>
                Admission Requirements
              </h2>
              <ul className='space-y-2 mb-4'>
                <li className='flex items-center gap-2'>
                  <span className='text-primary'>•</span>
                  Master&apos;s degree in relevant field
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-primary'>•</span>
                  Research proposal (3000 words)
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-primary'>•</span>3 Letters of
                  Recommendation
                </li>
                <li className='flex items-center gap-2'>
                  <span className='text-primary'>•</span>
                  Interview with potential supervisor
                </li>
              </ul>
              <Button className='w-full'>Start Application</Button>
            </Card>

            <Card className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>Supervision Team</h2>
              <div className='space-y-4'>
                {faculty.map((member) => (
                  <div key={member.name} className='flex items-center gap-4'>
                    <Image
                      src={member.image}
                      alt={member.name}
                      width={12} height={12}
                      className='w-12 h-12 rounded-full object-cover'
                    />
                    <div>
                      <h3 className='font-medium'>{member.name}</h3>
                      <p className='text-sm text-muted-foreground'>
                        {member.position}
                        <br />
                        <span className='text-primary'>
                          {member.publications}+ publications
                        </span>
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant='outline' className='w-full mt-4'>
                View All Supervisors
              </Button>
            </Card>

            <Card className='p-6'>
              <h2 className='text-xl font-semibold mb-4'>
                Publication Requirements
              </h2>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <BookOpenText className='text-primary' />
                  <span>Minimum 3 journal publications</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Users className='text-primary' />
                  <span>2 conference presentations</span>
                </div>
              </div>
              <Link
                href='/resources/publication-guide'
                className='text-primary text-sm mt-2 block'>
                View publication guidelines →
              </Link>
            </Card>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
