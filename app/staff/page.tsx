"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { BookOpen, Linkedin, Mail, MinusIcon, Twitter, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StaffPage() {
  const fetchedStaff = useQuery(api.staff.getStaff);
  const [staff, setStaff] = useState(fetchedStaff ?? []);
  const [selectedStaff, setSelectedStaff] = useState<(typeof staff)[0] | null>(
    null
  );

  useEffect(() => {
    if (fetchedStaff !== undefined) {
      setStaff(fetchedStaff); // Update state when data arrives
    }
  }, [fetchedStaff]);

  // Prevent background scroll when modal is open
  useEffect(() => {
    if (selectedStaff) {
      document.body.style.overflow = "hidden"; // Disable scrolling
    } else {
      document.body.style.overflow = ""; // Enable scrolling when modal is closed
    }
    return () => {
      document.body.style.overflow = ""; // Cleanup on unmount
    };
  }, [selectedStaff]);

  const closeModal = () => setSelectedStaff(null);

  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-gray-50 dark:bg-inherit'>
      {/* Page Header */}
      <div className='text-center mb-12'>
        <h1 className='text-3xl sm:text-4xl font-bold mb-4'>Our Staff</h1>
        <p className='text-lg text-muted-foreground max-w-xl mx-auto '>
          Meet the dedicated and accomplished staff members who are shaping the
          future of education at GO University PGS.
        </p>
      </div>

      {/* Staff Grid */}
      {!staff && staff === undefined && (
        <div className='flex items-center justify-center px-4 py-20'>
          No staff list found.
        </div>
      )}
      <div>
        {staff.length === 0 ? (
          <div className='flex items-center justify-center px-4 py-20'>
            <MinusIcon className='animate-spin mr-3' /> Loading staff list
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
            {staff.map((staffMember) => (
              <motion.div
                key={staffMember._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}>
                <Card className=' hover:shadow-lg transition-shadow rounded-lg overflow-hidden border-amber-100 dark:border-gray-500/50'>
                  {/* Staff Image */}
                  <div className='relative w-full h-64  mb-4'>
                    <Image
                      src={staffMember.image}
                      alt={staffMember.name}
                      fill
                      className='object-cover'
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                    />
                  </div>

                  {/* Staff Details */}
                  <div className='text-center px-4 pb-4'>
                    <h2 className='text-xl font-semibold mb-1'>
                      {staffMember.name}
                    </h2>
                    <p className='text-sm text-muted-foreground mb-4'>
                      {staffMember.role}
                    </p>

                    {/* Social Links */}
                    <div className='flex justify-center gap-4 mb-4'>
                      <a
                        href={`mailto:${staffMember.email}`}
                        className='text-primary hover:text-primary/80'>
                        <Mail className='w-5 h-5' />
                      </a>
                      <a
                        href={staffMember.social.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-primary hover:text-primary/80'>
                        <Linkedin className='w-5 h-5' />
                      </a>
                      <a
                        href={staffMember.social.twitter}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-primary hover:text-primary/80'>
                        <Twitter className='w-5 h-5' />
                      </a>
                    </div>

                    {/* View Profile Button */}
                    <Button
                      variant='outline'
                      className='w-full'
                      onClick={() => setSelectedStaff(staffMember)}>
                      <BookOpen className='mr-2 w-4 h-4' />
                      View Profile
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Modal - Display if selectedStaff is not null */}
      {selectedStaff && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          onClick={closeModal}>
          <div
            className='bg-white dark:bg-gray-800 max-w-lg w-full rounded-lg shadow-lg p-6 relative flex flex-col max-h-[90vh] overflow-hidden'
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            {/* Close Button */}
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
              onClick={closeModal}>
              <X className='w-6 h-6' />
            </button>

            {/* Staff Header */}
            <div className='flex items-center gap-4 border-b pb-4'>
              <div className='relative w-16 h-16 rounded-full overflow-hidden'>
                <Image
                  src={selectedStaff.image}
                  alt={selectedStaff.name}
                  fill
                  className='object-cover'
                />
              </div>
              <div>
                <h2 className='text-xl font-semibold'>{selectedStaff.name}</h2>
                <p className='text-sm text-muted-foreground'>
                  {selectedStaff.role}
                </p>
              </div>
            </div>

            {/* Scrollable Content */}
            <div className='overflow-y-auto max-h-[60vh] mt-4 px-2'>
              <p className='text-sm text-muted-foreground'>
                {selectedStaff.profile}
              </p>
            </div>

            {/* Footer */}
            <div className='mt-4 flex justify-end'>
              <Button variant='outline' onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
