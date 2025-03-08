'use client'

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Clock, AlertTriangle, CheckCircle } from "lucide-react";

const deadlines = [
  {
    program: "Master's Programs",
    deadline: "2024-03-15",
    status: "open",
    documents: "2024-04-01",
  },
  {
    program: "PhD Programs",
    deadline: "2024-04-30",
    status: "open",
    documents: "2024-05-15",
  },
  {
    program: "PG Certificates",
    deadline: "2024-02-28",
    status: "passed",
    documents: "2024-03-15",
  },
];

export default function DeadlinesPage() {
  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <h1 className='text-3xl font-bold mb-8'>Application Deadlines</h1>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {deadlines.map((item, index) => (
            <Card key={item.program + index} className='p-6 relative'>
              <div className='flex items-center gap-2 mb-4'>
                {item.status === "open" ? (
                  <CheckCircle className='text-green-500' />
                ) : (
                  <AlertTriangle className='text-yellow-500' />
                )}
                <h2 className='text-xl font-semibold'>{item.program}</h2>
              </div>

              <div className='space-y-4'>
                <div>
                  <h3 className='font-medium mb-2'>Application Deadline</h3>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4' />
                    <span>{item.deadline}</span>
                  </div>
                </div>

                <div>
                  <h3 className='font-medium mb-2'>Document Submission</h3>
                  <div className='flex items-center gap-2'>
                    <Clock className='w-4 h-4' />
                    <span>{item.documents}</span>
                  </div>
                </div>

                {item.status === "open" && (
                  <div className='mt-4'>
                    <Button variant='secondary' className='w-full'>
                      Apply Now
                    </Button>
                  </div>
                )}
              </div>

              {item.status === "passed" && (
                <div className='absolute top-0 right-0 bg-red-100 text-red-800 px-3 py-1 rounded-bl-lg'>
                  Closed
                </div>
              )}
            </Card>
          ))}
        </div>

        <Card className='mt-8 p-6'>
          <h2 className='text-xl font-semibold mb-4'>Key Dates</h2>
          <div className='grid md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
              <h3 className='font-medium'>Admission Timeline</h3>
              <ul className='list-disc pl-6'>
                <li>Application Review: 4-6 weeks</li>
                <li>Interviews: Rolling basis</li>
                <li>Final Decisions: Within 8 weeks of deadline</li>
              </ul>
            </div>
            <div className='space-y-2'>
              <h3 className='font-medium'>Important Notes</h3>
              <ul className='list-disc pl-6'>
                <li>Early applications encouraged</li>
                <li>Funding deadlines may vary</li>
                <li>International visas require additional processing time</li>
              </ul>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}
