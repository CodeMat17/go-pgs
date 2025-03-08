'use client'

import { Card } from "@/components/ui/card";
import { CheckCircle2, BookOpen, FileText, Globe } from "lucide-react";
import { motion } from "framer-motion";

export default function RequirementsPage() {
  return (
    <div className='w-full min-h-screen max-w-6xl mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <h1 className='text-3xl font-bold mb-8'>Admission Requirements</h1>

        <div className='grid md:grid-cols-2 gap-6'>
          <Card className='p-6'>
            <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
              <BookOpen className='text-primary' /> Academic Requirements
            </h2>
            <ul className='space-y-4'>
              {[
                "Bachelor's degree with minimum 2:1 classification",
                "Official academic transcripts",
                "Minimum GPA of 3.0/4.0 or equivalent",
                "Program-specific prerequisites",
              ].map((item, index) => (
                <li key={index} className='flex items-center gap-2'>
                  <CheckCircle2 className='text-green-500' />
                  {item}
                </li>
              ))}
            </ul>
          </Card>

          <Card className='p-6'>
            <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
              <FileText className='text-primary' /> Documentation
            </h2>
            <div className='space-y-4'>
              <div className='border-l-4 border-primary pl-4'>
                <h3 className='font-medium'>Mandatory Documents</h3>
                <ul className='list-disc pl-6 mt-2'>
                  <li>Academic transcripts</li>
                  <li>Proof of English proficiency</li>
                  <li>Research proposal (PhD applicants)</li>
                </ul>
              </div>

              <div className='border-l-4 border-secondary pl-4'>
                <h3 className='font-medium'>Additional Requirements</h3>
                <ul className='list-disc pl-6 mt-2'>
                  <li>Letters of recommendation</li>
                  <li>CV/Resume</li>
                  <li>Statement of purpose</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className='p-6 md:col-span-2'>
            <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
              <Globe className='text-primary' /> International Students
            </h2>
            <div className='grid md:grid-cols-2 gap-6'>
              <div>
                <h3 className='font-medium mb-2'>English Proficiency</h3>
                <ul className='space-y-2'>
                  <li>IELTS: 6.5+</li>
                  <li>TOEFL iBT: 90+</li>
                  <li>Duolingo: 120+</li>
                </ul>
              </div>
              <div>
                <h3 className='font-medium mb-2'>Visa Requirements</h3>
                <ul className='space-y-2'>
                  <li>Valid passport</li>
                  <li>Proof of funding</li>
                  <li>Medical insurance</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
}
