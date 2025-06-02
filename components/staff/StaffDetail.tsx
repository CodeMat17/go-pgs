"use client";

import { SafeHTMLRenderer } from "@/components/SafeHTMLRenderer";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Loader2, X } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

const SPECIAL_STAFF_CRITERIA = {
  firstName: "Christian",
  lastName: "Anieke",
} as const;

export default function StaffDetail() {
  const staffList = useQuery(api.staff.getStaff);
  const shouldReduceMotion = useReducedMotion();
  type StaffMember = NonNullable<typeof staffList>[0];
  const [selectedStaff, setSelectedStaff] = useState<StaffMember | null>(null);

  // Handle escape key for modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedStaff(null);
    };

    if (selectedStaff) {
      document.documentElement.style.overflow = "hidden";
      document.addEventListener("keydown", handleEscape);
      document.getElementById("staff-modal")?.focus();
    }

    return () => {
      document.documentElement.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [selectedStaff]);

  // Memoize staff filtering
  const featuredStaff = useCallback((staff: StaffMember) => {
    const name = staff.name.trim();
    return (
      name.includes(SPECIAL_STAFF_CRITERIA.firstName) &&
      name.includes(SPECIAL_STAFF_CRITERIA.lastName)
    );
  }, []);

  const regularStaff = useCallback(
    (staff: StaffMember) => {
      return !featuredStaff(staff);
    },
    [featuredStaff]
  );

  if (staffList === undefined) {
    return (
      <div
        className='min-h-[50vh] flex items-center justify-center'
        role='status'
        aria-live='polite'>
        <Loader2 className='h-8 w-8 animate-spin text-primary mr-2' />
        <span className='text-lg'>Loading staff directory...</span>
      </div>
    );
  }

  const hasFeaturedStaff = staffList.some(featuredStaff);

  return (
    <main className='w-full px-4 sm:px-6 lg:px-8 py-12 bg-gray-100 dark:bg-gray-950'>
      <div className='max-w-6xl mx-auto'>
        <header className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-bold mb-4' id='main-heading'>
            Administrative Team
          </h1>
          <p
            className='text-lg text-muted-foreground max-w-xl mx-auto'
            aria-describedby='main-heading'>
            Meet our distinguished administrative team shaping the future of
            postgraduate education at Godfrey Okoye University.
          </p>
        </header>

        {/* Featured Staff Section */}
        {hasFeaturedStaff && (
          <section aria-labelledby='featured-staff-heading' className='mb-12'>
            <h2 id='featured-staff-heading' className='sr-only'>
              Featured Staff Member
            </h2>
            <div className='max-w-4xl mx-auto'>
              {staffList.filter(featuredStaff).map((staff) => (
                <div
                  key={staff._id}
                  className='w-full sm:max-w-[640px] mx-auto bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl hover:border-primary/40 transition-all sm:flex sm:flex-row'>
                  <div className='relative w-full aspect-square sm:max-w-xs'>
                    <Image
                      alt={`Portrait of ${staff.name}`}
                      src={staff.imageUrl || "/default-avatar.png"}
                      fill
                      className='object-cover'
                      sizes='(max-width: 640px) 100vw, 320px'
                      priority
                    />
                  </div>
                  <div className='p-4 sm:p-6 flex flex-col justify-center items-center text-center flex-1'>
                    <div>
                      <h2 className='font-bold text-xl sm:text-2xl text-gray-900 dark:text-gray-50 mb-1'>
                        {staff.name} 
                      </h2>
                      <p className=' text-gray-600 dark:text-gray-400 mb-4'>
                        {staff.role}
                      </p>
                      <div className='flex gap-3 items-center justify-center'>
                     
                        <Button
                          variant='outline'
                          size='sm'
                          onClick={() => setSelectedStaff(staff)}
                          className='flex-1 sm:flex-none'
                          aria-label={`View full profile of ${staff.name}`}>
                          <BookOpen
                            className='w-3 h-3 mr-2'
                            aria-hidden='true'
                          />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Regular Staff Section */}
        {staffList.length === 0 ? (
          <div
            className='min-h-[30vh] flex items-center justify-center'
            role='status'
            aria-live='polite'>
            <p className='text-lg text-muted-foreground'>
              No staff members found
            </p>
          </div>
        ) : (
          <section aria-labelledby='staff-list-heading' className='mt-16'>
            <h2 id='staff-list-heading' className='sr-only'>
              All Staff Members
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  gap-3'>
              {staffList.filter(regularStaff).map((staff, index) => (
                <motion.div
                  key={staff._id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true, margin: "100px" }}>
                  <div className='group h-full bg-white dark:bg-gray-900 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-all'>
                    <div className='relative aspect-square  overflow-hidden'>
                      <Image
                        src={staff.imageUrl || "/default-avatar.png"}
                        alt={`Portrait of ${staff.name}`}
                        fill
                        className='object-cover transform group-hover:scale-105 transition-transform duration-300'
                        sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                        loading={index > 3 ? "lazy" : undefined}
                        priority={index <= 3}
                      />
                    </div>
                    <div className='p-4 sm:p-6 text-center'>
                      <h3 className='font-semibold text-xl mb-1 text-gray-900 dark:text-gray-50'>
                        {staff.name}
                      </h3>
                      <p className='text-gray-600 dark:text-gray-400 mb-4'>
                        {staff.role}
                      </p>
                      <Button
                        variant='outline'
                        onClick={() => setSelectedStaff(staff)}
                        className='w-full'
                        aria-label={`View profile of ${staff.name}`}>
                        <BookOpen className='w-4 h-4 mr-2' aria-hidden='true' />
                        View Profile
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Staff Modal */}
        {selectedStaff && (
          <StaffModal
            staff={selectedStaff}
            onClose={() => setSelectedStaff(null)}
          />
        )}
      </div>
    </main>
  );
}

// Staff Modal Component
function StaffModal({
  staff,
  onClose,
}: {
  staff: NonNullable<ReturnType<typeof useQuery<typeof api.staff.getStaff>>>[0];
  onClose: () => void;
}) {
  return (
    <div
      role='dialog'
      aria-modal='true'
      aria-labelledby='staff-modal-title'
      className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'
      onClick={onClose}>
      <div
        id='staff-modal'
        className='bg-background max-w-lg w-full rounded-lg shadow-lg p-6 relative flex flex-col max-h-[90vh] overflow-hidden'
        onClick={(e) => e.stopPropagation()}
        tabIndex={-1}>
        <button
          className='absolute top-4 right-4 p-1 hover:bg-accent rounded-full'
          onClick={onClose}
          aria-label='Close profile modal'>
          <X className='w-6 h-6' />
        </button>

        <div className='flex items-center gap-4 border-b pb-4'>
          <div className='relative w-16 h-16 rounded-full overflow-hidden'>
            <Image
              src={staff.imageUrl || "/default-avatar.png"}
              alt={`Portrait of ${staff.name}`}
              fill
              className='object-cover'
              sizes='64px'
            />
          </div>
          <div>
            <h2 id='staff-modal-title' className='text-xl font-semibold'>
              {staff.name}
            </h2>
            <p className='text-sm text-muted-foreground'>{staff.role}</p>
          </div>
        </div>

        <div className='overflow-y-auto max-h-[60vh] mt-4 px-2 prose dark:prose-invert'>
          <SafeHTMLRenderer
            htmlContent={staff.profile ?? ""}
            className='text-foreground'
          />
        </div>

        <div className='mt-4 flex justify-end border-t pt-4'>
          <Button
            variant='outline'
            onClick={onClose}
            aria-label='Close profile'>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}
