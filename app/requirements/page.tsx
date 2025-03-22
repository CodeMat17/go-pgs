"use client";

import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { CheckCircle2, Globe, MinusIcon } from "lucide-react";

export default function RequirementsPage() {
  const requirements =
    useQuery(api.admissionRequirements.getAdmissionRequirements) ?? [];
  const otherRoutes = useQuery(
    api.alternativeAdmissions.getAlternativeAdmissionRoute
  );

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
          <p className='mt-3'>
            Admission decisions are based on academic merit and open to all
            irrespective of nationality, ethnicity, sex or the physically
            challenged.
          </p>
        </div>

        {/* Program-Specific Requirements */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-12'>
          {requirements.map((requirement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}>
              <Card className='p-6 h-full'>
                <div className='flex flex-col  '>
                  {/* <div className='mb-4'>{requirement.icon}</div> */}
                  {requirements.length === 0 ? (
                    <div className="flex items-center justify-center"><MinusIcon className="animate-spin mr-3" /> loading...</div>
                  ) : (
                    <>
                      <h2 className='text-xl font-semibold mb-4 lg:text-center'>
                        {requirement.title}
                      </h2>
                      <ul className='space-y-2 text-sm text-muted-foreground'>
                        {requirement.requirements.map((item, i) => (
                          <li key={i} className='flex items-center gap-2'>
                            <CheckCircle2 className='w-4 h-4 text-green-500 flex-shrink-0' />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Transfer & Visiting Students */}
        {otherRoutes && (
          <Card className='p-6 mb-12'>
            <h2 className='text-2xl font-semibold mb-4 flex items-center gap-2'>
              <Globe className='text-primary' /> Other Admission Routes
            </h2>
            {otherRoutes && otherRoutes.length === 0 ? (
              <div className='flex items-center'>
                <MinusIcon className='animate-spin mr-3' /> Loading ...
              </div>
            ) : (
              otherRoutes.map((others) => (
                <ul key={others._id} className=' text-muted-foreground'>
                  <li className='mb-3'>
                    <strong>{others.title}:</strong> {others.description}
                  </li>
                </ul>
              ))
            )}
          </Card>
        )}
      </motion.div>
    </div>
  );
}
