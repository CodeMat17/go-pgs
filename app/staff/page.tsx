"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Twitter, BookOpen } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";

const staffMembers = [
  {
    id: 1,
    name: "Dr. Jane Doe",
    role: "Professor of Biotechnology",
    image: "/staff/jane-doe.jpg", // Replace with actual image path
    bio: "Expert in genetic engineering with over 15 years of experience in academic research.",
    email: "jane.doe@gouni.edu",
    social: {
      linkedin: "https://linkedin.com/janedoe",
      twitter: "https://twitter.com/janedoe",
    },
  },
  {
    id: 2,
    name: "Dr. John Smith",
    role: "Head of Computer Science",
    image: "/staff/john-smith.jpg", // Replace with actual image path
    bio: "Specializes in artificial intelligence and machine learning applications.",
    email: "john.smith@gouni.edu",
    social: {
      linkedin: "https://linkedin.com/johnsmith",
      twitter: "https://twitter.com/johnsmith",
    },
  },
  {
    id: 3,
    name: "Dr. Emily Johnson",
    role: "Associate Professor of Management",
    image: "/staff/emily-johnson.jpg", // Replace with actual image path
    bio: "Focuses on organizational behavior and strategic management.",
    email: "emily.johnson@gouni.edu",
    social: {
      linkedin: "https://linkedin.com/emilyjohnson",
      twitter: "https://twitter.com/emilyjohnson",
    },
  },
  {
    id: 4,
    name: "Dr. Michael Brown",
    role: "Lecturer in Political Science",
    image: "/staff/michael-brown.jpg", // Replace with actual image path
    bio: "Expert in international relations and public policy analysis.",
    email: "michael.brown@gouni.edu",
    social: {
      linkedin: "https://linkedin.com/michaelbrown",
      twitter: "https://twitter.com/michaelbrown",
    },
  },
];

export default function StaffPage() {
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
        {staffMembers.map((staff) => (
          <motion.div
            key={staff.id}
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
                  <Link href={`/staff/${staff.id}`}>
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
