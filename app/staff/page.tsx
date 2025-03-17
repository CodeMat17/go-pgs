"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import { BookOpen, Linkedin, Mail, MinusIcon, Twitter } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function StaffPage() {
  const fetchedStaff = useQuery(api.staff.getStaff);
  const [staff, setStaff] = useState(fetchedStaff ?? []);

  useEffect(() => {
    if (fetchedStaff !== undefined) {
      setStaff(fetchedStaff); // Only update state when data arrives
    }
  }, [fetchedStaff]);

  if (fetchedStaff === undefined) {
    return (
      <div className='w-full min-h-96 flex items-center justify-center'>
        <MinusIcon className='animate-spin mr-3' /> Loading staff list
      </div>
    );
  }

  if (!fetchedStaff)
    return (
      <div className='w-full min-h-96 flex items-center justify-center'>
        <MinusIcon className='animate-spin mr-3' /> Loading staff list
      </div>
    );

  if (fetchedStaff.length === 0) {
    return (
      <div className='w-full min-h-96 flex items-center justify-center'>
        <MinusIcon className='animate-spin mr-3' /> Loading staff list
      </div>
    );
  }

  return (
    <div className='w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      {/* Page Header */}
      <div className='text-center mb-12'>
        <h1 className='text-3xl sm:text-4xl font-bold mb-4'>Our Staff</h1>
        <p className='text-lg text-muted-foreground'>
          Meet the dedicated and accomplished faculty members who are shaping
          the future of education at GO University.
        </p>
      </div>

      {/* Staff Grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {staff.length < 0
          ? <div className="text-center px-4 py-40">No staff list at the moment</div>
          : staff.map((staff) => (
              <motion.div
                key={staff._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}>
                <Card className='p-4 hover:shadow-lg transition-shadow'>
                  {/* Staff Image */}
                  <div className='relative w-full h-64 rounded-lg overflow-hidden mb-4'>
                    <Image
                      src={staff.image}
                      alt={staff.name}
                      fill
                      className='object-cover'
                      sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw'
                    />
                  </div>

                  {/* Staff Details */}
                  <div className='text-center'>
                    <h2 className='text-xl font-semibold mb-1'>{staff.name}</h2>
                    <p className='text-sm text-muted-foreground mb-4'>
                      {staff.role}
                    </p>
                    <p className='text-sm text-muted-foreground mb-4'>
                      {staff.bio}
                    </p>

                    {/* Social Links */}
                    <div className='flex justify-center gap-4 mb-4'>
                      <a
                        href={`mailto:${staff.email}`}
                        className='text-primary hover:text-primary/80'>
                        <Mail className='w-5 h-5' />
                      </a>
                      <a
                        href={staff.social.linkedin}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-primary hover:text-primary/80'>
                        <Linkedin className='w-5 h-5' />
                      </a>
                      <a
                        href={staff.social.twitter}
                        target='_blank'
                        rel='noopener noreferrer'
                        className='text-primary hover:text-primary/80'>
                        <Twitter className='w-5 h-5' />
                      </a>
                    </div>

                    {/* View Profile Button */}
                    <Button variant='outline' className='w-full' asChild>
                      <Link href={`/staff/${staff._id}`}>
                        <BookOpen className='mr-2 w-4 h-4' />
                        View Profile
                      </Link>
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
      </div>
    </div>
  );
}
