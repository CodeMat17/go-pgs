"use client";

import PaginationComponent from "@/components/PaginationComponent";
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
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Linkedin, Mail, MinusIcon } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { FaWhatsapp } from "react-icons/fa";

export default function AlumniDetail() {
const rawAlumni = useQuery(api.alumni.getAlumni);

const alumni = useMemo(() => rawAlumni ?? [], [rawAlumni]);  const shouldReduceMotion = useReducedMotion();

  // Memoize derived data
  const [uniqueYears, uniquePrograms] = useMemo(() => {
    const years = Array.from(
      new Set(alumni.map((alumnus) => alumnus.graduatedOn))
    )
      .filter((y): y is string => typeof y === "string")
      .sort((a, b) => Number(b) - Number(a));
    const programs = Array.from(
      new Set(alumni.map((alumnus) => alumnus.degree))
    );
    return [years, programs];
  }, [alumni]);

  // State management
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Memoize filtered results
  const filteredAlumni = useMemo(() => {
    const lowerSearch = searchTerm.toLowerCase();
    return alumni.filter((alumnus) => {
      const matchesSearch = alumnus.name.toLowerCase().includes(lowerSearch);
      const matchesProgram =
        selectedProgram === "all" || alumnus.degree === selectedProgram;
      const matchesYear =
        selectedYear === "all" || alumnus.graduatedOn === selectedYear;
      return matchesSearch && matchesProgram && matchesYear;
    });
  }, [alumni, searchTerm, selectedProgram, selectedYear]);

  // Pagination calculations
  const { totalPages, paginatedAlumni } = useMemo(() => {
    const total = Math.ceil(filteredAlumni.length / itemsPerPage);
    const paginated = filteredAlumni.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
    return { totalPages: total, paginatedAlumni: paginated };
  }, [filteredAlumni, currentPage, itemsPerPage]);

  // Page change handler
  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <div className='w-full min-h-screen max-w-5xl mx-auto px-4 py-12'>
      <motion.div
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}>
        {/* Header Section */}
        <header className='text-center mb-12'>
          <h1 className='text-3xl sm:text-4xl font-bold mb-4'>
            Alumni Success Stories
          </h1>
          <p className='text-lg sm:text-xl text-muted-foreground'>
            Discover how our graduates are making an impact worldwide
          </p>
        </header>

        {/* Filters Section */}
        <section
          className='grid md:grid-cols-3 gap-4 mb-8'
          aria-label='Alumni filters'>
          <Input
            placeholder='Search alumni...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='bg-gray-50 dark:bg-amber-500/10 py-5'
            aria-label='Search alumni by name'
          />
          <Select
            onValueChange={setSelectedProgram}
            aria-label='Filter by program'>
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
          <Select
            onValueChange={setSelectedYear}
            aria-label='Filter by graduation year'>
            <SelectTrigger className='bg-gray-50 dark:bg-amber-500/10 py-5'>
              <SelectValue placeholder='Filter by year' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='all'>All Years</SelectItem>
              {uniqueYears.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </section>

        {/* Alumni Grid */}
        {alumni === undefined ? (
          <div
            className='w-full flex items-center justify-center py-48'
            aria-live='polite'>
            <MinusIcon className='animate-spin mr-3' aria-hidden='true' />
            <span>Loading alumni data...</span>
          </div>
        ) : paginatedAlumni.length > 0 ? (
          <>
            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-6'>
              {paginatedAlumni.map((alumnus, index) => (
                <motion.article
                  key={alumnus._id}
                  initial={shouldReduceMotion ? false : { y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  aria-label={`Alumnus profile: ${alumnus.name}`}>
                  <Card className='hover:shadow-lg transition-shadow h-full flex flex-col'>
                    <div className='p-6 flex-grow'>
                      <div className='flex items-start gap-4 mb-4'>
                        {alumnus.photo ? (
                          <div className='relative w-16 h-16 shrink-0'>
                            <Image
                              alt={`Profile photo of ${alumnus.name}`}
                              fill
                              src={alumnus.photo}
                              className='rounded-full object-cover'
                              sizes='(max-width: 768px) 96px, 128px'
                              quality={85}
                              priority={index < 3}
                            />
                          </div>
                        ) : (
                          <Avatar className='w-16 h-16'>
                            <AvatarImage
                              src={alumnus.photo}
                              alt={alumnus.name}
                            />
                            <AvatarFallback className='capitalize text-lg'>
                              {alumnus.name[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                        <div className='flex-1'>
                          <h2 className='text-xl font-semibold capitalize'>
                            {alumnus.name}
                          </h2>
                          <div className='flex items-center gap-2 mt-1'>
                            <Badge
                              variant='secondary'
                              className='dark:bg-gray-700 dark:text-gray-100'>
                              {alumnus.degree}
                            </Badge>
                            <Badge className='dark:bg-amber-600/20 dark:text-amber-100'>
                              {alumnus.graduatedOn}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className='flex items-center gap-2 mb-2 text-sm'>
                        <Briefcase
                          className='w-4 h-4 text-primary'
                          aria-hidden='true'
                        />
                        <span className='font-medium'>
                          {alumnus.currentPosition}
                        </span>
                      </div>
                      <p
                        className='mb-4 line-clamp-3'
                        aria-label='Alumnus testimonial'>
                        {alumnus.testimonial}
                      </p>
                      <div className='flex gap-2 flex-wrap'>
                        {alumnus.linkedin && (
                          <Button
                            variant='outline'
                            size='sm'
                            asChild
                            className='border-blue-500/50 hover:border-blue-500 dark:border-blue-900/50 dark:hover:border-blue-900'>
                            <a
                              href={alumnus.linkedin}
                              target='_blank'
                              rel='noopener noreferrer'
                              aria-label={`Connect with ${alumnus.name} on LinkedIn`}>
                              <Linkedin className='h-4 w-4 mr-2' />
                              Connect
                            </a>
                          </Button>
                        )}
                        {alumnus.tel && (
                          <Button
                            variant='outline'
                            size='sm'
                            asChild
                            className='border-green-500/50 hover:border-green-500 dark:border-green-900/50 dark:hover:border-green-900'>
                            <a
                              href={`https://wa.me/${alumnus.tel}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              aria-label={`Chat with ${alumnus.name} on WhatsApp`}>
                              <FaWhatsapp className='h-4 w-4 mr-2' />
                              Chat
                            </a>
                          </Button>
                        )}
                        {alumnus.email && (
                          <Button
                            variant='outline'
                            size='sm'
                            asChild
                            className='border-gray-500/50 hover:border-gray-500 dark:border-gray-700/50 dark:hover:border-gray-600'>
                            <a
                              href={`mailto:${alumnus.email}`}
                              target='_blank'
                              rel='noopener noreferrer'
                              aria-label={`Email ${alumnus.name}`}>
                              <Mail className='h-4 w-4 mr-2' />
                              Email
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <nav aria-label='Alumni pagination' className='mt-8'>
                <PaginationComponent
                  totalPages={totalPages}
                  handlePageChange={handlePageChange}
                  currentPage={currentPage}
                />
              </nav>
            )}
          </>
        ) : (
          <p
            className='text-center text-lg text-muted-foreground py-12'
            aria-live='polite'>
            No alumni found matching your search criteria.
          </p>
        )}
      </motion.div>
    </div>
  );
}
