"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion } from "framer-motion";
import {
  Briefcase,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  Linkedin,
  Mail,
  MinusIcon,
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function AlumniPage() {
  const alumni = useQuery(api.alumni.getAlumni) ?? [];

  const uniqueYears = Array.from(
    new Set(alumni.map((alumnus) => alumnus.graduatedOn))
  )
    .filter((y): y is string => typeof y === "string")
    .sort((a, b) => b.localeCompare(a));
  const uniquePrograms = Array.from(
    new Set(alumni.map((alumnus) => alumnus.degree))
  );

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  const filteredAlumni = alumni.filter((alumnus) => {
    const matchesSearch = alumnus.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesProgram =
      selectedProgram === "all" || alumnus.degree === selectedProgram;
    const matchesYear =
      selectedYear === "all" || alumnus.graduatedOn === selectedYear;
    return matchesSearch && matchesProgram && matchesYear;
  });

  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  const paginatedAlumni = filteredAlumni.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold mb-4'>Alumni Success Stories</h1>
          <p className='text-xl text-muted-foreground'>
            Discover how our graduates are making an impact worldwide
          </p>
        </div>

        {/* Filters */}
        <div className='grid md:grid-cols-3 gap-4 mb-8'>
          <Input
            placeholder='Search alumni...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='bg-gray-50 dark:bg-amber-500/10 py-5'
          />
          <Select onValueChange={setSelectedProgram}>
            <SelectTrigger className='bg-gray-50 dark:bg-amber-500/10 py-5'>
              <SelectValue placeholder='Filter by program' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Programs</SelectItem>
              {uniquePrograms.map((program) => (
                <SelectItem key={program} value={program}>
                  {program}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select onValueChange={setSelectedYear}>
            <SelectTrigger className='bg-gray-50 dark:bg-amber-500/10 py-5'>
              <SelectValue placeholder='Filter by year' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Years</SelectItem>
              {uniqueYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Alumni Grid */}
        {alumni === undefined && !alumni ? (
          <div className='w-full flex items-center justify-center py-48'>
            <MinusIcon className='animate-spin mr-3' /> Please wait...
          </div>
        ) : paginatedAlumni.length > 0 ? (
          <>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {paginatedAlumni.map((alumnus, index) => (
                <motion.div
                  key={alumnus._id}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}>
                  <Card className='hover:shadow-lg transition-shadow h-full'>
                    <div className='p-6'>
                      <div className='flex items-start gap-4 mb-4'>
                        {alumnus.photo ? (
                          <div className='relative w-[65px] aspect-square'>
                            <Image
                              alt={alumnus.name}
                              fill
                              src={alumnus.photo}
                              className='rounded-full object-cover overflow-hidden'
                            />
                          </div>
                        ) : (
                          <Avatar className='w-16 h-16'>
                            <AvatarImage src={alumnus.photo} />
                            <AvatarFallback className='capitalize'>
                              {alumnus.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className='flex-1'>
                          <h3 className='text-xl font-semibold capitalize'>
                            {alumnus.name}
                          </h3>
                          <div className='flex items-center gap-2 mt-1'>
                            <Badge variant='secondary'>{alumnus.degree}</Badge>
                            <Badge>{alumnus.graduatedOn}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center gap-2 mb-2 text-sm'>
                        <Briefcase className='w-4 h-4 text-primary' />
                        <span className='font-medium'>
                          {alumnus.currentPosition}
                        </span>
                      </div>
                      <p className='mb-4 line-clamp-3'>{alumnus.testimonial}</p>
                      <div className='flex gap-2'>
                        {alumnus.linkedin && (
                          <Button
                            variant='outline'
                            size='sm'
                            asChild
                            className='border-blue-500 dark:border-blue-900'>
                            <a
                              href={alumnus.linkedin}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-4xl text-blue-500 hover:text-blue-600 transition-colors'>
                              <Linkedin className='h-4 w-4' /> Connect
                            </a>
                          </Button>
                        )}
                        {alumnus.phone && (
                          <Button
                            variant='outline'
                            size='sm'
                            asChild
                            className='border-green-500 dark:border-green-900'>
                            <a
                              href={`https://wa.me/${alumnus.phone}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-4xl text-green-500 hover:text-green-600 transition-colors'
                              aria-label='Chat on WhatsApp'>
                              <FaWhatsapp className='w-8 h-8' />
                              Chat
                            </a>
                          </Button>
                        )}
                        {alumnus.phone && (
                          <Button
                            variant='outline'
                            size='sm'
                            asChild
                            className=''>
                            <a
                              href={`mailto: ${alumnus.email}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              className='text-4xl'
                              aria-label='Chat on WhatsApp'>
                              <Mail className='w-8 h-8' />
                              Email
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
            <div className='mt-12 bg-gray-100 dark:bg-gray-800 py-3 border'>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(currentPage - 1)}>
                      <ChevronsLeftIcon />
                    </Button>
                  </PaginationItem>
                  <PaginationItem className='px-4'>
                    Page {currentPage} of {totalPages}
                  </PaginationItem>
                  <PaginationItem>
                    <Button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(currentPage + 1)}>
                      <ChevronsRightIcon />
                    </Button>
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </>
        ) : (
          <p className='text-center text-lg text-muted-foreground'>
            No alumni found matching your search input.
          </p>
        )}
      </motion.div>
    </div>
  );
}
