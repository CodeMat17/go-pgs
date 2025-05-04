"use client";

import { SafeHTMLRenderer } from "@/components/SafeHTMLRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Linkedin, Mail, MinusIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StaffDetail() {
  const staffList = useQuery(api.staff.getStaff);
  const shouldReduceMotion = useReducedMotion();
  type StaffMember = NonNullable<typeof staffList>[0];
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Accessibility: Modal management
  useEffect(() => {
    if (selectedStaff) {
      document.documentElement.style.overflow = "hidden";
      document.getElementById("staff-modal")?.focus();
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [selectedStaff]);

  if (staffList === undefined) {
    return (
      <div
        className='px-4 py-64 flex items-center justify-center'
        aria-live='polite'>
        <MinusIcon className='animate-spin mr-3' aria-hidden='true' />
        <span>Loading staff directory...</span>
      </div>
    );
  }

  return (
    <main className='w-full  px-4 sm:px-6 lg:px-8 py-12 bg-gray-100 dark:bg-gray-950'>
      <div className='max-w-6xl mx-auto'>
        <header className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-bold mb-4'>
            Our Academic Staff
          </h1>
          <p className='text-lg text-muted-foreground max-w-xl mx-auto'>
            Meet the dedicated staff members shaping education at GO
            University School of Postgraduate Studies.
          </p>
        </header>

        {staffList.length === 0 ? (
          <div
            className='flex items-center justify-center px-4 py-20'
            aria-live='polite'>
            No staff members found
          </div>
        ) : (
          <ul className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 list-none'>
            {staffList.map(
              (
                staff,
                index // Add index parameter
              ) => (
                <motion.li
                  key={staff._id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true, margin: "100px" }}>
                  <article className='h-full'>
                    <Card className='hover:shadow-lg transition-shadow rounded-lg overflow-hidden border-amber-100 dark:border-gray-500/50 h-full flex flex-col'>
                      <figure className='relative w-full aspect-square mb-3'>
                        <Image
                          src={staff.imageUrl || "/default-avatar.png"}
                          alt={`Portrait of ${staff.name}`}
                          fill
                          className='object-cover'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          priority={index < 3} // Use index-based priority
                        />
                      </figure>
                      <div className='text-center px-4 pb-3 flex-1 flex flex-col'>
                        <h2 className='text-xl font-semibold'>
                          {staff.name}
                        </h2>
                        <p className='text-muted-foreground mb-4'>
                          {staff.role}
                        </p>
                        <div className='flex justify-center gap-4 mb-4'>
                          <a
                            href={`mailto:${staff.email}`}
                            className='text-primary hover:scale-110'
                            aria-label={`Email ${staff.name}`}>
                            <Mail className='w-5 h-5' />
                          </a>
                          {staff.linkedin ? (
                            <a
                              href={staff.linkedin}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-primary hover:scale-105'
                              aria-label={`View ${staff.name}'s LinkedIn profile`}>
                              <Linkedin className='w-5 h-5' />
                            </a>
                          ) : (
                            <Linkedin
                              className='w-5 h-5 text-gray-300 dark:text-gray-600'
                              aria-hidden='true'
                            />
                          )}
                        </div>
                        <Button
                          variant='outline'
                          className='w-full mt-auto'
                          onClick={() => setSelectedStaff(staff)}
                          aria-label={`View profile of ${staff.name}`}>
                          <BookOpen
                            className='mr-2 w-4 h-4'
                            aria-hidden='true'
                          />
                          View Profile
                        </Button>
                      </div>{" "}
                    </Card>
                  </article>
                </motion.li>
              )
            )}
          </ul>
        )}

        {selectedStaff && (
          <div
            role='dialog'
            aria-modal='true'
            aria-labelledby='staff-modal-title'
            className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'
            onClick={() => setSelectedStaff(null)}>
            <div
              id='staff-modal'
              className='bg-background max-w-lg w-full rounded-lg shadow-lg p-6 relative flex flex-col max-h-[90vh] overflow-hidden'
              onClick={(e) => e.stopPropagation()}
              tabIndex={-1}>
              <button
                className='absolute top-4 right-4 p-1 hover:bg-accent rounded-full'
                onClick={() => setSelectedStaff(null)}
                aria-label='Close profile modal'>
                <X className='w-6 h-6' />
              </button>

              <div className='flex items-center gap-4 border-b pb-4'>
                <div className='relative w-16 h-16 rounded-full overflow-hidden'>
                  <Image
                    src={selectedStaff.imageUrl || "/default-avatar.png"}
                    alt={`Portrait of ${selectedStaff.name}`}
                    fill
                    className='object-cover'
                    sizes='80px'
                  />
                </div>
                <div>
                  <h2 id='staff-modal-title' className='text-xl font-semibold'>
                    {selectedStaff.name}
                  </h2>
                  <p className='text-sm text-muted-foreground'>
                    {selectedStaff.role}
                  </p>
                </div>
              </div>

              <div className='overflow-y-auto max-h-[60vh] mt-4 px-2 prose dark:prose-invert'>
                <SafeHTMLRenderer
                  htmlContent={selectedStaff.profile ?? ""}
                  className='text-foreground'
                />
              </div>

              <div className='mt-4 flex justify-end border-t pt-4'>
                <Button
                  variant='outline'
                  onClick={() => setSelectedStaff(null)}
                  aria-label='Close profile'>
                  Close
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
