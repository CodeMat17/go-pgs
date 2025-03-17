"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { BookOpen, Calendar, MinusIcon, Monitor, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ProgramsPage() {
  const fetchedPrograms = useQuery(api.programs.getFewProgramsData);
  const [programs, setPrograms] = useState(fetchedPrograms ?? []);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredPrograms = programs
    ? programs.filter((program) =>
        program?.programShortName
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase())
      )
    : [];

  useEffect(() => {
    if (fetchedPrograms !== undefined) {
      setPrograms(fetchedPrograms); // Only update state when data arrives
    }
  }, [fetchedPrograms]);

  if (fetchedPrograms === undefined) {
    return (
      <div className='w-full min-h-96 flex items-center justify-center'>
        <MinusIcon className='animate-spin mr-3' /> Loading programs
      </div>
    );
  }

  if (!fetchedPrograms) return (
    <div className='w-full min-h-96 flex items-center justify-center'>
      <MinusIcon className='animate-spin mr-3' /> Loading programs
    </div>
  );

  if (fetchedPrograms.length === 0) {
    return (
      <div className='w-full min-h-96 flex items-center justify-center'>
        <MinusIcon className='animate-spin mr-3' /> Loading programs
      </div>
    );
  }

  return (
    <div className='w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <h1 className='text-3xl sm:text-4xl font-bold mb-4'>
        Available Programs
      </h1>
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
          className="border-amber-500 bg-amber-50 dark:bg-amber-500/20 py-5"/>
          <p className='text-sm text-muted-foreground mt-2 text-amber-700 dark:text-amber-500'>
            Start typing to find a specific program.
          </p>
        </div>

        <div className='grid sm:grid-cols-2 md:grid-cols-3 gap-4'>
          {filteredPrograms.length > 0 ? (
            filteredPrograms.map((program) => (
              <Card
                key={program._id}
                className={`p-4 hover:shadow-lg transition-shadow ${program.status ? "" : "bg-red-800/10 dark:bg-red-800/20"}`}>
                <h3 className='text-lg font-semibold mb-2'>
                  {program.programShortName}
                </h3>
                <div className='flex flex-col gap-2 text-sm text-muted-foreground'>
                  <div className='flex items-center gap-2'>
                    <Calendar className='w-4 h-4' />
                    <span>{program.studyDuration}</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    {program.deliveryMode === "Online" && (
                      <Monitor className='w-4 h-4' />
                    )}
                    {program.deliveryMode === "On-Campus" && (
                      <BookOpen className='w-4 h-4' />
                    )}
                    {program.deliveryMode === "Online & On-Campus" && (
                      <Users className='w-4 h-4' />
                    )}
                    <span>{program.deliveryMode}</span>
                  </div>
                </div>
                {program.status ? (
                  <Button asChild variant='link' className='mt-2 p-0'>
                    <Link href={`/programs/${program.slug}`}>Learn More →</Link>
                  </Button>
                ) : (
                  <div className='flex items-center gap-2 mt-2'>
                    <Badge
                      variant='destructive'
                      className='flex gap-2 items-center pt-1 pb-2'>
                      Closed
                    </Badge>
                  </div>
                )}
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
