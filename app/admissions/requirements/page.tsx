"use client";

import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  BookOpen,
  FileText,
  Globe,
  GraduationCap,
  UserCheck,
} from "lucide-react";
import { motion } from "framer-motion";

export default function RequirementsPage() {
  return (
    <div className='w-full min-h-screen max-w-6xl mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Page Header */}
        <div className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-bold mb-4'>
            Admission Requirements
          </h1>
          <p className='text-lg text-muted-foreground'>
            Explore the admission criteria for our PGD, Master&apos;s, and Ph.D.
            programs.
          </p>
        </div>

        {/* Program-Specific Requirements */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12'>
          {[
            {
              icon: <GraduationCap className='w-8 h-8 text-primary' />,
              title: "Postgraduate Diploma (PGD)",
              requirements: [
                "Bachelor's degree with at least 3rd Class Honours",
                "Minimum of 5 credits in relevant O'Level subjects",
                "NYSC discharge/exemption certificate",
                "Professional certifications (if applicable)",
              ],
            },
            {
              icon: <BookOpen className='w-8 h-8 text-primary' />,
              title: "Master's Degree",
              requirements: [
                "Bachelor's degree with minimum 2:2 classification",
                "Minimum GPA of 3.0/4.0 or equivalent",
                "Relevant work experience (for professional programs)",
                "Research proposal (for thesis-based programs)",
              ],
            },
            {
              icon: <UserCheck className='w-8 h-8 text-primary' />,
              title: "Ph.D. Program",
              requirements: [
                "Master's degree in a relevant field",
                "Strong academic record (minimum GPA of 3.5/4.0)",
                "Detailed research proposal",
                "Publications in peer-reviewed journals (preferred)",
              ],
            },
          ].map((program, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}>
              <Card className='p-6 h-full'>
                <div className='flex flex-col items-center '>
                  <div className='mb-4'>{program.icon}</div>
                  <h2 className='text-xl font-semibold mb-4'>
                    {program.title}
                  </h2>
                  <ul className='space-y-2 text-sm text-muted-foreground'>
                    {program.requirements.map((item, i) => (
                      <li key={i} className='flex items-start gap-2'>
                        <CheckCircle2 className='w-4 h-4 text-green-500 flex-shrink-0' />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* General Requirements */}
        <div className='grid md:grid-cols-2 gap-6 mb-12'>
          {/* Academic Requirements */}
          <Card className='p-6'>
            <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
              <BookOpen className='text-primary' /> Academic Requirements
            </h2>
            <ul className='space-y-4'>
              {[
                "Official academic transcripts from all institutions attended",
                "Minimum of 5 O'Level credits (including English and Mathematics)",
                "NYSC discharge/exemption certificate (for Nigerian applicants)",
                "Proof of English proficiency (for international students)",
              ].map((item, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <CheckCircle2 className='text-green-500' />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          {/* Documentation */}
          <Card className='p-6'>
            <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
              <FileText className='text-primary' /> Required Documents
            </h2>
            <div className='space-y-4'>
              <div className='border-l-4 border-primary pl-4'>
                <h3 className='font-medium'>Mandatory Documents</h3>
                <ul className='list-disc pl-6 mt-2 text-muted-foreground'>
                  <li>Completed application form</li>
                  <li>Academic transcripts</li>
                  <li>Proof of English proficiency (if applicable)</li>
                </ul>
              </div>

              <div className='border-l-4 border-secondary pl-4'>
                <h3 className='font-medium'>Additional Documents</h3>
                <ul className='list-disc pl-6 mt-2 text-muted-foreground'>
                  <li>Letters of recommendation (2-3)</li>
                  <li>CV/Resume</li>
                  <li>Statement of purpose</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* International Students Section */}
        <Card className='p-6'>
          <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
            <Globe className='text-primary' /> International Students
          </h2>
          <div className='grid md:grid-cols-2 gap-6'>
            <div>
              <h3 className='font-medium mb-2'>English Proficiency</h3>
              <ul className='space-y-2 text-muted-foreground'>
                <li>IELTS: 6.5+</li>
                <li>TOEFL iBT: 90+</li>
                <li>Duolingo: 120+</li>
              </ul>
            </div>
            <div>
              <h3 className='font-medium mb-2'>Visa Requirements</h3>
              <ul className='space-y-2 text-muted-foreground'>
                <li>Valid passport</li>
                <li>Proof of financial support</li>
                <li>Medical insurance</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
