"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { motion, useReducedMotion } from "framer-motion";
import { Briefcase, Linkedin, Mail, Search, Users, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";

// ── Helpers ───────────────────────────────────────────────────────────────────
function getDegreeAccent(degree: string) {
  const d = degree.toLowerCase();
  if (d.includes("pgd") || d.includes("postgraduate diploma"))
    return { bar: "bg-blue-500", badge: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300" };
  if (d.includes("master") || d.includes("msc") || d.includes("mba") || d.includes("ma"))
    return { bar: "bg-violet-500", badge: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300" };
  if (d.includes("phd") || d.includes("doctor"))
    return { bar: "bg-emerald-500", badge: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300" };
  return { bar: "bg-primary", badge: "bg-primary/10 text-primary" };
}

function getInitials(name: string) {
  return name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

const ITEMS_PER_PAGE = 9;

// ── Main Component ────────────────────────────────────────────────────────────
export default function AlumniDetail() {
  const rawAlumni = useQuery(api.alumni.getAlumni);
  const alumni = useMemo(() => rawAlumni ?? [], [rawAlumni]);
  const isLoading = rawAlumni === undefined;
  const shouldReduceMotion = useReducedMotion();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Derived filter options
  const [uniqueYears, uniquePrograms] = useMemo(() => {
    const years = Array.from(new Set(alumni.map((a) => a.graduatedOn)))
      .filter((y): y is string => typeof y === "string" && y.trim() !== "")
      .sort((a, b) => Number(b) - Number(a));
    const programs = Array.from(new Set(alumni.map((a) => a.degree))).filter(Boolean);
    return [years, programs];
  }, [alumni]);

  // Filtered + paginated results
  const { filteredAlumni, totalPages, paginatedAlumni } = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    const filtered = alumni.filter((a) => {
      const matchName = a.name.toLowerCase().includes(lower);
      const matchProgram = selectedProgram === "all" || a.degree === selectedProgram;
      const matchYear = selectedYear === "all" || a.graduatedOn === selectedYear;
      return matchName && matchProgram && matchYear;
    });
    const total = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );
    return { filteredAlumni: filtered, totalPages: total, paginatedAlumni: paginated };
  }, [alumni, searchTerm, selectedProgram, selectedYear, currentPage]);

  // Reset page when filters change
  useEffect(() => { setCurrentPage(1); }, [searchTerm, selectedProgram, selectedYear]);

  // Clamp page when total shrinks
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
  }, [totalPages, currentPage]);

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedProgram("all");
    setSelectedYear("all");
  };

  const hasActiveFilters =
    searchTerm !== "" || selectedProgram !== "all" || selectedYear !== "all";

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className='min-h-screen bg-background'>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className='relative overflow-hidden bg-gradient-to-br from-primary dark:from-gray-700 via-primary/90 to-primary/80 py-16 sm:py-20 lg:py-24'>
        <div
          className='absolute inset-0 bg-[url("/pattern.png")] opacity-5'
          aria-hidden='true'
        />
        <div
          className='absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#FFDC55]/10 blur-3xl pointer-events-none'
          aria-hidden='true'
        />
        <div
          className='absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none'
          aria-hidden='true'
        />
        <div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <span className='inline-block mb-4 px-4 py-1.5 rounded-full bg-[#FFDC55]/15 border border-[#FFDC55]/35 text-[#FFDC55] text-sm font-semibold tracking-wide'>
            Alumni Network
          </span>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight'>
            Alumni Success Stories
          </h1>
          <p className='mt-4 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed'>
            Discover how our graduates are driving innovation, leading
            organisations, and making a lasting impact around the world.
          </p>

          {/* Degree legend */}
          <div className='mt-8 flex flex-wrap gap-4'>
            {[
              { label: "PGD", color: "bg-blue-400" },
              { label: "Masters", color: "bg-violet-400" },
              { label: "PhD", color: "bg-emerald-400" },
            ].map(({ label, color }) => (
              <div
                key={label}
                className='flex items-center gap-2 text-white/75 text-sm'>
                <span className={`w-2.5 h-2.5 rounded-full ${color}`} />
                {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12'>
        {/* ── Filter Panel ─────────────────────────────────────────────── */}
        <div
          className='rounded-2xl border border-border bg-card p-5 mb-8 space-y-4'
          aria-label='Alumni filters'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
              <Input
                placeholder='Search by name…'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='pl-9 pr-9'
                aria-label='Search alumni by name'
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                  aria-label='Clear search'>
                  <X className='h-4 w-4' />
                </button>
              )}
            </div>

            {/* Program filter */}
            <Select value={selectedProgram} onValueChange={setSelectedProgram}>
              <SelectTrigger aria-label='Filter by programme'>
                <SelectValue placeholder='All Programmes' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Programmes</SelectItem>
                {uniquePrograms.map((p) => (
                  <SelectItem key={p} value={p}>
                    {p}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Year filter */}
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger aria-label='Filter by graduation year'>
                <SelectValue placeholder='All Years' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Years</SelectItem>
                {uniqueYears.map((y) => (
                  <SelectItem key={y} value={y}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex flex-wrap gap-2 items-center pt-1'>
              <button
                onClick={clearFilters}
                className='text-xs text-destructive hover:text-destructive/80 flex items-center gap-1 font-medium'>
                <X className='w-3 h-3' /> Clear all
              </button>
              {searchTerm && (
                <span className='inline-flex items-center gap-1.5 text-xs bg-muted border border-border rounded-full px-3 py-1'>
                  Name: {searchTerm}
                  <button onClick={() => setSearchTerm("")} aria-label='Remove search filter'>
                    <X className='h-3 w-3' />
                  </button>
                </span>
              )}
              {selectedProgram !== "all" && (
                <span className='inline-flex items-center gap-1.5 text-xs bg-muted border border-border rounded-full px-3 py-1'>
                  Programme: {selectedProgram}
                  <button onClick={() => setSelectedProgram("all")} aria-label='Remove programme filter'>
                    <X className='h-3 w-3' />
                  </button>
                </span>
              )}
              {selectedYear !== "all" && (
                <span className='inline-flex items-center gap-1.5 text-xs bg-muted border border-border rounded-full px-3 py-1'>
                  Year: {selectedYear}
                  <button onClick={() => setSelectedYear("all")} aria-label='Remove year filter'>
                    <X className='h-3 w-3' />
                  </button>
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* ── Grid ─────────────────────────────────────────────────────── */}
        {isLoading ? (
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {[...Array(6)].map((_, i) => (
              <div key={i} className='rounded-2xl border border-border overflow-hidden'>
                <div className='h-1 bg-muted' />
                <div className='p-5 space-y-3'>
                  <div className='flex items-center gap-3'>
                    <Skeleton className='w-12 h-12 rounded-full flex-shrink-0' />
                    <div className='flex-1 space-y-1.5'>
                      <Skeleton className='h-4 w-3/4 rounded-lg' />
                      <Skeleton className='h-3 w-1/2 rounded-lg' />
                    </div>
                  </div>
                  <Skeleton className='h-3 w-full rounded-lg' />
                  <Skeleton className='h-3 w-4/5 rounded-lg' />
                  <Skeleton className='h-3 w-full rounded-lg' />
                  <Skeleton className='h-3 w-2/3 rounded-lg' />
                  <div className='flex gap-2 pt-1'>
                    <Skeleton className='h-7 w-20 rounded-lg' />
                    <Skeleton className='h-7 w-16 rounded-lg' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedAlumni.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 text-center gap-3'>
            <div className='w-16 h-16 rounded-2xl bg-muted flex items-center justify-center'>
              <Users className='w-8 h-8 text-muted-foreground/40' />
            </div>
            <p className='text-lg font-semibold text-foreground'>
              No alumni found
            </p>
            <p className='text-sm text-muted-foreground'>
              {hasActiveFilters
                ? "Try adjusting your filters."
                : "Check back later for updates."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className='mt-1 text-sm text-primary hover:underline font-semibold'>
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <>
            {/* Result count */}
            {hasActiveFilters && (
              <p className='text-sm text-muted-foreground mb-5'>
                Showing{" "}
                <span className='font-semibold text-foreground'>
                  {filteredAlumni.length}
                </span>{" "}
                result{filteredAlumni.length !== 1 ? "s" : ""}
              </p>
            )}

            <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
              {paginatedAlumni.map((alumnus, index) => {
                const accent = getDegreeAccent(alumnus.degree);
                return (
                  <motion.article
                    key={alumnus._id}
                    initial={
                      shouldReduceMotion ? false : { opacity: 0, y: 20 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.06 }}
                    aria-label={`Alumni profile: ${alumnus.name}`}
                    className='flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                    {/* Accent bar */}
                    <div className={`h-1 w-full flex-shrink-0 ${accent.bar}`} />

                    <div className='flex flex-col flex-1 p-5'>
                      {/* Profile row */}
                      <div className='flex items-start gap-3 mb-4'>
                        {/* Avatar */}
                        <div className='relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0 border border-border bg-muted'>
                          {alumnus.photo ? (
                            <Image
                              src={alumnus.photo}
                              alt={`Photo of ${alumnus.name}`}
                              fill
                              className='object-cover object-top'
                              sizes='48px'
                              priority={index < 3}
                            />
                          ) : (
                            <div className='w-full h-full flex items-center justify-center bg-primary/10 text-primary font-bold text-sm'>
                              {getInitials(alumnus.name)}
                            </div>
                          )}
                        </div>

                        {/* Name + badges */}
                        <div className='min-w-0 flex-1'>
                          <h2 className='font-bold text-foreground text-sm leading-snug capitalize truncate'>
                            {alumnus.name}
                          </h2>
                          <div className='flex flex-wrap gap-1.5 mt-1.5'>
                            <span
                              className={`text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full ${accent.badge}`}>
                              {alumnus.degree}
                            </span>
                            {alumnus.graduatedOn && (
                              <span className='text-[10px] font-bold tracking-wide px-2 py-0.5 rounded-full bg-muted text-muted-foreground'>
                                {alumnus.graduatedOn}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Position */}
                      <div className='flex items-start gap-2 mb-3 text-sm'>
                        <Briefcase
                          className='w-3.5 h-3.5 text-primary flex-shrink-0 mt-0.5'
                          aria-hidden='true'
                        />
                        <span className='text-foreground font-medium leading-snug line-clamp-1'>
                          {alumnus.currentPosition}
                          {alumnus.company ? `, ${alumnus.company}` : ""}
                        </span>
                      </div>

                      {/* Testimonial */}
                      {alumnus.testimonial && (
                        <blockquote className='flex-1 mb-4 text-sm text-muted-foreground italic leading-relaxed line-clamp-3 border-l-2 border-border pl-3'>
                          &ldquo;{alumnus.testimonial}&rdquo;
                        </blockquote>
                      )}

                      {/* Contact links */}
                      <div className='flex flex-wrap gap-2 mt-auto pt-3 border-t border-border/50'>
                        {alumnus.linkedin && (
                          <a
                            href={alumnus.linkedin}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`Connect with ${alumnus.name} on LinkedIn`}
                            className='inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-blue-200 dark:border-blue-900/50 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors'>
                            <Linkedin className='w-3.5 h-3.5' />
                            Connect
                          </a>
                        )}
                        {alumnus.tel && (
                          <a
                            href={`https://wa.me/${alumnus.tel}`}
                            target='_blank'
                            rel='noopener noreferrer'
                            aria-label={`Chat with ${alumnus.name} on WhatsApp`}
                            className='inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-green-200 dark:border-green-900/50 text-green-600 dark:text-green-400 hover:bg-green-50 dark:hover:bg-green-900/20 transition-colors'>
                            <FaWhatsapp className='w-3.5 h-3.5' />
                            Chat
                          </a>
                        )}
                        {alumnus.email && (
                          <a
                            href={`mailto:${alumnus.email}`}
                            aria-label={`Email ${alumnus.name}`}
                            className='inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition-colors'>
                            <Mail className='w-3.5 h-3.5' />
                            Email
                          </a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* ── Pagination ─────────────────────────────────────────── */}
            {totalPages > 1 && (
              <nav className='mt-12' aria-label='Alumni pagination'>
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage - 1);
                        }}
                        aria-disabled={currentPage === 1}
                        className={
                          currentPage === 1
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                      />
                    </PaginationItem>
                    <PaginationItem>
                      <span className='px-4 h-10 flex items-center text-sm font-medium text-muted-foreground'>
                        Page {currentPage} of {totalPages}
                      </span>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationNext
                        onClick={(e) => {
                          e.preventDefault();
                          handlePageChange(currentPage + 1);
                        }}
                        aria-disabled={currentPage === totalPages}
                        className={
                          currentPage === totalPages
                            ? "opacity-50 cursor-not-allowed"
                            : ""
                        }
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </nav>
            )}
          </>
        )}
      </section>
    </div>
  );
}
