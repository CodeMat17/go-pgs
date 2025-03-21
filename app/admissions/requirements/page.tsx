"use client";

import { Card } from "@/components/ui/card";
import {
  CheckCircle2,
  BookOpen,
  Globe,
  GraduationCap,
  UserCheck,
  BellRingIcon,
} from "lucide-react";
import { motion } from "framer-motion";

export default function RequirementsPage() {
  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
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
            Learn about the eligibility criteria for our postgraduate programs.
          </p>
        </div>
        <div className='border mb-7 p-4 rounded-xl bg-[#FEDA37]/30'>
          <BellRingIcon className='w-10 h-10 text-orange-500 dark:text-[#FEDA37] flex-shrink-0 mb-3' />
          <p>
            Godfrey Okoye University admission decisions are based on academic
            merit. Admissions are open to all irrespective of nationality,
            ethnicity, sex or physical challenges.{" "}
          </p>
        </div>

        {/* Program-Specific Requirements */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12'>
          {[
            {
              icon: <GraduationCap className='w-8 h-8 text-primary' />,
              title: "Postgraduate Diploma (PGD)",
              requirements: [
                "First degree or HND (merit pass)",
                "Minimum of 5 O'Level credits, including English & Mathematics",
              ],
            },
            {
              icon: <BookOpen className='w-8 h-8 text-primary' />,
              title: "Master's Degree",
              requirements: [
                "Second Class (Lower Division) from a recognized university",
                "Minimum CGPA of 2.50 on a 5-point scale",
                "Academic transcripts required",
              ],
            },
            {
              icon: <UserCheck className='w-8 h-8 text-primary' />,
              title: "Ph.D. Program",
              requirements: [
                "Master’s degree with a minimum CGPA of 3.50 or 60% score",
                "Academic transcripts required",
                "Interview and research proposal defense",
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

        {/* Transfer & Visiting Students */}
        <Card className='p-6 mb-12'>
          <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
            <Globe className='text-primary' /> Other Admission Routes
          </h2>
          <ul className='space-y-4 text-muted-foreground'>
            <li>
              <strong>Transfer Students:</strong> Minimum CGPA of 2.5 on a 4.0
              scale or 4.0 on a 5.0 scale from a reputable university.
            </li>
            <li>
              <strong>Visiting/Exchange Students:</strong> Submit an
              application, an official transcript, and a letter from the home
              institution confirming good standing.
            </li>
          </ul>
        </Card>
      </motion.div>
    </div>
  );
}
