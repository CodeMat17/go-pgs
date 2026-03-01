"use client";

import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, Clock, GraduationCap, Search, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type CourseLevel = "all" | "pgd" | "masters" | "phd";

const courseLevels: { value: CourseLevel; label: string }[] = [
  { value: "all", label: "All Programs" },
  { value: "pgd", label: "PGD" },
  { value: "masters", label: "Masters" },
  { value: "phd", label: "PhD" },
];

const levelAccent: Record<string, string> = {
  pgd: "bg-blue-500",
  masters: "bg-violet-500",
  phd: "bg-emerald-500",
};

const levelBadge: Record<string, string> = {
  pgd: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  masters:
    "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  phd: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

// ── Pill button helper ─────────────────────────────────────────────────────
function Pill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all duration-150 whitespace-nowrap ${
        active
          ? "bg-primary text-primary-foreground border-primary"
          : "bg-background text-muted-foreground border-border hover:border-primary/50 hover:text-foreground"
      }`}>
      {children}
    </button>
  );
}

// ── Main component ─────────────────────────────────────────────────────────
export default function CourseBrowser() {
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all");
  const [selectedLevel, setSelectedLevel] = useState<CourseLevel>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const allCourses = useQuery(api.courses.getAllCourses);
  const faculties = useQuery(api.faculties.getFaculties);
  const isLoading = allCourses === undefined || faculties === undefined;

  const filteredCourses =
    allCourses?.filter((course) => {
      const matchesFaculty =
        selectedFaculty === "all" || course.faculty === selectedFaculty;
      const matchesLevel =
        selectedLevel === "all" || course.type === selectedLevel;
      const matchesSearch = course.course
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      return matchesFaculty && matchesLevel && matchesSearch;
    }) ?? [];

  const hasActiveFilters =
    selectedFaculty !== "all" || selectedLevel !== "all" || !!searchQuery;

  const clearFilters = () => {
    setSelectedFaculty("all");
    setSelectedLevel("all");
    setSearchQuery("");
  };

  return (
    <div className='space-y-8'>
      {/* ── Filter panel ──────────────────────────────────────────────── */}
      <div className='bg-card border border-border rounded-2xl p-4 sm:p-6 space-y-5'>
        {/* Search */}
        <div className='relative'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
          <Input
            type='text'
            placeholder='Search courses…'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className='pl-9 pr-9 h-11 rounded-xl'
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label='Clear search'
              className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'>
              <X className='h-4 w-4' />
            </button>
          )}
        </div>

        {/* Program level pills */}
        <div>
          <p className='text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2.5'>
            Program Level
          </p>
          <div className='flex flex-wrap gap-2'>
            {courseLevels.map(({ value, label }) => (
              <Pill
                key={value}
                active={selectedLevel === value}
                onClick={() => setSelectedLevel(value)}>
                {label}
              </Pill>
            ))}
          </div>
        </div>

        {/* Faculty pills — fetched from DB */}
        <div>
          <p className='text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-2.5'>
            Faculty
          </p>
          {faculties === undefined ? (
            <div className='flex flex-wrap gap-2'>
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} className='h-8 w-36 rounded-full' />
              ))}
            </div>
          ) : (
            <div className='flex flex-wrap gap-2'>
              <Pill
                active={selectedFaculty === "all"}
                onClick={() => setSelectedFaculty("all")}>
                All Faculties
              </Pill>
              {faculties.map((faculty) => (
                <Pill
                  key={faculty._id}
                  active={selectedFaculty === faculty.name}
                  onClick={() => setSelectedFaculty(faculty.name)}>
                  {faculty.name.replace("Faculty of ", "")}
                </Pill>
              ))}
            </div>
          )}
        </div>

        {/* Active filters footer */}
        {hasActiveFilters && (
          <div className='flex items-center gap-2 pt-1 border-t border-border'>
            <span className='text-xs text-muted-foreground'>
              {filteredCourses.length} result
              {filteredCourses.length !== 1 ? "s" : ""}
            </span>
            <button
              onClick={clearFilters}
              className='ml-auto text-xs text-primary hover:underline font-semibold'>
              Clear all filters
            </button>
          </div>
        )}
      </div>

      {/* ── Results ───────────────────────────────────────────────────── */}
      {isLoading ? (
        <div className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'>
          {[...Array(6)].map((_, i) => (
            <Skeleton key={i} className='h-52 w-full rounded-2xl' />
          ))}
        </div>
      ) : filteredCourses.length === 0 ? (
        <div className='flex flex-col items-center justify-center py-24 text-center gap-3'>
          <div className='w-16 h-16 rounded-2xl bg-muted flex items-center justify-center'>
            <GraduationCap className='w-8 h-8 text-muted-foreground/50' />
          </div>
          <p className='text-lg font-semibold text-foreground'>
            No courses found
          </p>
          <p className='text-sm text-muted-foreground max-w-xs'>
            Try adjusting your filters or search term.
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
        <AnimatePresence mode='wait'>
          <motion.div
            key={`${selectedFaculty}-${selectedLevel}-${searchQuery}`}
            className='grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}>
            {filteredCourses.map((course, i) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}>
                <Link
                  href={`/courses/${course.slug}`}
                  className='group flex flex-col h-full rounded-2xl border border-border bg-card hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 overflow-hidden'>
                  {/* Level accent bar */}
                  <div
                    className={`h-1 w-full ${levelAccent[course.type] ?? "bg-primary"}`}
                  />

                  <div className='flex flex-col flex-1 p-5'>
                    {/* Level badge */}
                    <span
                      className={`self-start text-[10px] font-bold tracking-wider px-2.5 py-0.5 rounded-full mb-3 ${levelBadge[course.type] ?? ""}`}>
                      {course.type.toUpperCase()}
                    </span>

                    {/* Course title */}
                    <h3 className='font-semibold text-base text-foreground leading-snug mb-4 group-hover:text-primary transition-colors'>
                      {course.course}
                    </h3>

                    {/* Meta info */}
                    <div className='mt-auto space-y-1.5 text-sm text-muted-foreground'>
                      <div className='flex items-center gap-2'>
                        <BookOpen className='w-3.5 h-3.5 shrink-0' />
                        <span className='truncate'>
                          {course.faculty.replace("Faculty of ", "")}
                        </span>
                      </div>
                      <div className='flex items-center gap-2'>
                        <Clock className='w-3.5 h-3.5 shrink-0' />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Footer link */}
                    <div className='mt-4 pt-3 border-t border-border'>
                      <span className='text-xs font-semibold text-primary group-hover:underline'>
                        View course details →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}
