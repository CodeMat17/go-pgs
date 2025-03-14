"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { Calendar, Monitor, BookOpen, Users } from "lucide-react";

const programs = [
  {
    id: "pgd-education",
    name: "PGD Education",
    duration: "12 Months",
    mode: "Online + Workshops",
  },
  {
    id: "pgd-biotech",
    name: "PGD Biotechnology",
    duration: "12 Months",
    mode: "Offline",
  },
  {
    id: "pgd-microbiology",
    name: "PGD Microbiology",
    duration: "12 Months",
    mode: "Offline",
  },
  {
    id: "pgd-accounting",
    name: "PGD Accounting",
    duration: "12 Months",
    mode: "Online",
  },
  {
    id: "pgd-banking-finance",
    name: "PGD Banking and Finance",
    duration: "12 Months",
    mode: "Online",
  },
  {
    id: "pgd-management",
    name: "PGD Management",
    duration: "12 Months",
    mode: "Online + Workshops",
  },
  {
    id: "pgd-public-admin",
    name: "PGD Public Administration",
    duration: "12 Months",
    mode: "Online",
  },
  {
    id: "pgd-political-science",
    name: "PGD Political Science",
    duration: "12 Months",
    mode: "Online",
  },
  {
    id: "pgd-intl-relations",
    name: "PGD International Relations",
    duration: "12 Months",
    mode: "Online",
  },
  {
    id: "pgd-mass-comm",
    name: "PGD Mass Communication",
    duration: "12 Months",
    mode: "Online + Workshops",
  },
  {
    id: "pgd-sociology",
    name: "PGD Sociology",
    duration: "12 Months",
    mode: "Online",
  },
  {
    id: "ma-english-lit",
    name: "M.A. English and Literary Studies",
    duration: "18 Months",
    mode: "Offline",
  },
  {
    id: "msc-compsci",
    name: "M.Sc. Computer Science",
    duration: "18 Months",
    mode: "Online",
  },
  {
    id: "msc-management",
    name: "M.Sc. Management",
    duration: "18 Months",
    mode: "Online + Workshops",
  },
  {
    id: "msc-psychology",
    name: "M.Sc. Applied Social Psychology",
    duration: "18 Months",
    mode: "Offline",
  },
  { id: "msc-law", name: "LLM Law", duration: "18 Months", mode: "Online" },
  {
    id: "phd-english-lit",
    name: "Ph.D. English Language and Literary Studies",
    duration: "36 Months",
    mode: "Offline",
  },
  {
    id: "phd-math-education",
    name: "Ph.D. Mathematics Education",
    duration: "36 Months",
    mode: "Online + Workshops",
  },
  {
    id: "phd-accounting",
    name: "Ph.D. Accounting",
    duration: "36 Months",
    mode: "Online",
  },
  {
    id: "phd-political-science",
    name: "Ph.D. Political Science",
    duration: "36 Months",
    mode: "Online",
  },
  { id: "llm-law", name: "LLM Law", duration: "18 Months", mode: "Online" },
];

export default function ProgramsPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrograms = searchTerm
    ? programs.filter((program) =>
        program.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : programs;

  return (
    <div className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl sm:text-4xl font-bold mb-4'>Programs</h1>
      <p className='text-lg text-muted-foreground mb-8'>
        Explore our diverse range of academic programs. Use the search below to
        find a specific program.
      </p>

    
        {/* Program List */}
        <div className='w-full'>
          <div className='mb-6'>
            <Input
              type='text'
              placeholder='Search for a program...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <p className='text-sm text-muted-foreground mt-2'>
              Start typing to find a specific program.
            </p>
          </div>

          <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {filteredPrograms.length > 0 ? (
              filteredPrograms.map((program) => (
                <Card
                  key={program.id}
                  className='p-4 hover:shadow-lg transition-shadow'>
                  <h3 className='text-lg font-semibold mb-2'>{program.name}</h3>
                  <div className='flex flex-col gap-2 text-sm text-muted-foreground'>
                    <div className='flex items-center gap-2'>
                      <Calendar className='w-4 h-4' />
                      <span>{program.duration}</span>
                    </div>
                    <div className='flex items-center gap-2'>
                      {program.mode === "Online" && (
                        <Monitor className='w-4 h-4' />
                      )}
                      {program.mode === "Offline" && (
                        <BookOpen className='w-4 h-4' />
                      )}
                      {program.mode === "Online + Workshops" && (
                        <Users className='w-4 h-4' />
                      )}
                      <span>{program.mode}</span>
                    </div>
                  </div>
                  <Button asChild variant='link' className='mt-2 p-0'>
                    <Link href={`/programs/${program.id}`}>Learn More →</Link>
                  </Button>
                </Card>
              ))
            ) : (
              <p className='text-center text-muted-foreground w-full'>
                No programs found.
              </p>
            )}
          </div>
        </div>

        {/* Requirements Section */}
       
    
    </div>
  );
}
