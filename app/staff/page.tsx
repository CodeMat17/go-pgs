"use client";

import { SafeHTMLRenderer } from "@/components/SafeHTMLRenderer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { BookOpen, Linkedin, Mail, MinusIcon, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function StaffPage() {
  const staffList = useQuery(api.staff.getStaff);
  type StaffMember = NonNullable<typeof staffList>[0];
  const [selectedStaff, setSelectedStaff] = useState<StaffMember |null>(null);

  useEffect(() => {
    document.body.style.overflow = selectedStaff ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedStaff]);

  if (staffList === undefined) {
    return (
      <div className='px-4 py-64 flex items-center justify-center'>
        <MinusIcon className='animate-spin mr-3' /> Loading...
      </div>
    );
  }

  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 dark:bg-inherit'>
      <div className='text-center mb-12'>
        <h1 className='text-3xl sm:text-4xl font-bold mb-4'>Our Staff</h1>
        <p className='text-lg text-muted-foreground max-w-xl mx-auto'>
          Meet the dedicated and accomplished staff members who are shaping the
          future of education at GO University PGS.
        </p>
      </div>

      {staffList.length === 0 ? (
        <div className='flex items-center justify-center px-4 py-20'>
          No staff list found.
        </div>
      ) : (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
          {staffList.map((staff) => (
            <motion.div
              key={staff.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}>
              <Card className='hover:shadow-lg transition-shadow rounded-lg overflow-hidden border-amber-100 dark:border-gray-500/50'>
                <div className='relative w-full h-64 mb-3'>
                  <Image
                    src={staff.imageUrl ?? ''}
                    alt={staff.name}
                    fill
                    className='object-cover'
                  />
                </div>
                <div className='text-center px-4 pb-3'>
                  <h2 className='text-xl font-semibold mb-1'>{staff.name}</h2>
                  <p className='text-sm text-muted-foreground mb-4'>
                    {staff.role}
                  </p>
                  <p>{ staff.imageUrl}</p>
                  <div className='flex justify-center gap-4 mb-4'>
                    <a
                      href={`mailto:${staff.email}`}
                      className='text-primary hover:scale-110'>
                      <Mail className='w-5 h-5' />
                    </a>
                    {staff.linkedin ? (
                      <a
                        href={staff.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-primary hover:scale-105'>
                        <Linkedin className='w-5 h-5' />
                      </a>
                    ) : (
                      <Linkedin className='w-5 h-5 text-gray-400 dark:text-gray-800' />
                    )}
                  </div>
                  <Button
                    variant='outline'
                    className='w-full'
                    onClick={() => setSelectedStaff(staff)}>
                    <BookOpen className='mr-2 w-4 h-4' /> View Profile
                  </Button>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {selectedStaff && (
        <div
          className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'
          onClick={() => setSelectedStaff(null)}>
          <div
            className='bg-white dark:bg-gray-800 max-w-lg w-full rounded-lg shadow-lg p-6 relative flex flex-col max-h-[90vh] overflow-hidden'
            onClick={(e) => e.stopPropagation()}>
            <button
              className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
              onClick={() => setSelectedStaff(null)}>
              <X className='w-6 h-6' />
            </button>
            <div className='flex items-center gap-4 border-b pb-4'>
              <div className='relative w-16 h-16 rounded-full overflow-hidden'>
                <Image
                  src={selectedStaff.imageUrl ?? "/default-avatar.png"}
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
            <div className='overflow-y-auto max-h-[60vh] mt-4 px-2'>
              <SafeHTMLRenderer
                htmlContent={selectedStaff.profile ?? ""}
                className='text-sm text-muted-foreground'
              />
            </div>
            <div className='mt-4 flex justify-end'>
              <Button variant='outline' onClick={() => setSelectedStaff(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
