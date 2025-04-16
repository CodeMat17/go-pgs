import { BookOpen, Calendar, Monitor, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type CourseProps = {
  course: string;
  slug: string;
  duration: string;
  mode: string;
};

const CourseCard = ({ course, slug, duration, mode }: CourseProps) => {
  return (
    <Card className='p-6 bg-background dark:bg-neutral-900/30 dark:border-neutral-700 flex flex-col'>
      <div className="space-y-4">
        <p className='text-lg font-medium'>{course}</p>
        <div className='space-y-0.5'>
          <div className='flex items-center gap-2 text-sm'>
            <Calendar className='w-4 h-4 text-amber-500' /> {duration} Months
          </div>
          {mode === "On-line" && (
            <div className='flex items-center gap-2 text-sm'>
              <Monitor className='w-4 h-4 text-amber-500' /> On-line
            </div>
          )}
          {mode === "On-campus" && (
            <div className='flex items-center gap-2 text-sm'>
              <BookOpen className='w-4 h-4 text-amber-500' /> On-campus
            </div>
          )}
          {mode === "On-line & On-campus" && (
            <div className='flex items-center gap-2 text-sm'>
              <Users className='w-4 h-4 text-amber-500' /> On-line & On-campus
            </div>
          )}
        </div>
      </div>
      <div className="mt-auto pt-6">
          <Button asChild variant='outline' className='w-full'>
        <Link href={`/courses/${slug}`}>Learn More →</Link>
      </Button>
      </div>
    
    </Card>
  );
};

export default CourseCard;
