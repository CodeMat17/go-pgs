"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";
import { Briefcase, Linkedin } from "lucide-react";

interface Alumni {
  id: number;
  name: string;
  photo: string;
  degree: string;
  year: number;
  currentPosition: string;
  company: string;
  testimonial: string;
  linkedin?: string;
}

const alumniData: Alumni[] = [
  {
    id: 1,
    name: "Dr. Adaobi Nwankwo",
    photo: "/alumni/adaobi.jpg",
    degree: "PhD Computer Science",
    year: 2018,
    currentPosition: "Senior AI Researcher",
    company: "Google DeepMind",
    testimonial:
      "The research facilities and mentorship at GO University paved the way for my career in AI...",
    linkedin: "https://linkedin.com/adaobi",
  },
  {
    id: 2,
    name: "Emeka Chukwu",
    photo: "/alumni/emeka.jpg",
    degree: "MSc Renewable Energy",
    year: 2020,
    currentPosition: "Energy Consultant",
    company: "UNDP Energy Program",
    testimonial:
      "The practical approach to sustainable energy solutions gave me a competitive edge...",
    linkedin: "https://linkedin.com/emeka",
  },
  // Add more alumni
];

export default function AlumniPage() {
  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Page Header */}
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>Alumni Success Stories</h1>
          <p className='text-xl text-muted-foreground'>
            Discover how our graduates are making an impact worldwide
          </p>
        </div>

        {/* Filters */}
        <div className='grid md:grid-cols-3 gap-4 mb-8'>
          <Input placeholder='Search alumni...' />
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Filter by program' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Programs</SelectItem>
              <SelectItem value='cs'>Computer Science</SelectItem>
              <SelectItem value='energy'>Renewable Energy</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Filter by year' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Years</SelectItem>
              <SelectItem value='2023'>2023</SelectItem>
              <SelectItem value='2022'>2022</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Alumni Grid */}
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {alumniData.map((alumnus, index) => (
            <motion.div
              key={alumnus.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}>
              <Card className='hover:shadow-lg transition-shadow h-full'>
                <div className='p-6'>
                  {/* Alumni Header */}
                  <div className='flex items-start gap-4 mb-4'>
                    <Avatar className='w-16 h-16'>
                      <AvatarImage src={alumnus.photo} />
                      <AvatarFallback>{alumnus.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className='flex-1'>
                      <h3 className='text-xl font-semibold'>{alumnus.name}</h3>
                      <div className='flex items-center gap-2 mt-1'>
                        <Badge variant='secondary'>{alumnus.degree}</Badge>
                        <Badge>{alumnus.year}</Badge>
                      </div>
                    </div>
                  </div>

                  {/* Current Position */}
                  <div className='flex items-center gap-2 mb-2 text-sm'>
                    <Briefcase className='w-4 h-4 text-primary' />
                    <span className='font-medium'>
                      {alumnus.currentPosition}
                    </span>
                  </div>
                  <div className='flex items-center gap-2 mb-4 text-sm text-muted-foreground'>
                    <span>@ {alumnus.company}</span>
                  </div>

                  {/* Testimonial */}
                  <p className='mb-4 line-clamp-3'>{alumnus.testimonial}</p>

                  {/* Actions */}
                  <div className='flex items-center gap-2'>
                    {alumnus.linkedin && (
                      <Button variant='outline' size='sm' asChild>
                        <a
                          href={alumnus.linkedin}
                          target='_blank'
                          rel='noopener noreferrer'>
                          <Linkedin className='mr-2 h-4 w-4' />
                          Connect
                        </a>
                      </Button>
                    )}
                    <Button variant='link' size='sm' asChild>
                      <a
                      //   href={`/alumni/${alumnus.id}`}
                      >
                        Full Story →
                      </a>
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <div className='mt-16 text-center'>
          <h2 className='text-2xl font-semibold mb-4'>
            Are you a GO University alumnus?
          </h2>
          <Button size='lg'>Share Your Story</Button>
        </div>
      </motion.div>
    </div>
  );
}
