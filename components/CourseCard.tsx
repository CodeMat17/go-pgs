import { BookOpen, Calendar, Monitor, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

type Mode = "On-line" | "On-campus" | "On-line & On-campus";

const modeConfig = {
  "On-line": { Icon: Monitor, label: "Online learning" },
  "On-campus": { Icon: BookOpen, label: "On-campus learning" },
  "On-line & On-campus": {
    Icon: Users,
    label: "Hybrid online and on-campus learning",
  },
} as const;

type CourseProps = {
  course: string;
  slug: string;
  duration: string;
  mode: string;
};

const CourseCard = ({ course, slug, duration, mode }: CourseProps) => {
  const renderModeIndicator = () => {
    if (mode in modeConfig) {
      const { Icon, label } = modeConfig[mode as Mode];
      return (
        <div className='flex items-center gap-2' aria-label={label}>
          <Icon
            className='w-4 h-4 text-amber-600 dark:text-amber-400'
            aria-hidden='true'
          />
          <span>{mode}</span>
        </div>
      );
    }
    return null;
  };

  return (
    <Card
      className='p-6 bg-white dark:bg-neutral-900/30 dark:border-neutral-800 flex flex-col'
      role='article'
      aria-labelledby={`course-${slug}-title`}>
      <div className='space-y-4'>
        <h3
          id={`course-${slug}-title`}
          className='text-lg font-semibold text-gray-900 dark:text-gray-100'>
          {course}
        </h3>
        <div className='space-y-0.5'>
          <div
            className='flex items-center gap-2 text-gray-700 dark:text-gray-300'
            aria-label={`Duration: ${duration}`}>
            <Calendar
              className='w-4 h-4 text-amber-600 dark:text-amber-400'
              aria-hidden='true'
            />
            <span>{duration}</span>
          </div>
          {renderModeIndicator()}
        </div>
      </div>
      <div className='mt-auto pt-6'>
        <Button
          asChild
          variant='outline'
          className='w-full hover:bg-amber-50 dark:hover:bg-amber-900/20 focus-visible:ring-2 focus-visible:ring-amber-500'
          aria-label={`Learn more about ${course}`}>
          <Link
            href={`/courses/${slug}`}
            prefetch={false}
            className='text-amber-700 hover:text-amber-800 dark:text-amber-300 dark:hover:text-amber-200'>
            View Course Details →
          </Link>
        </Button>
      </div>
    </Card>
  );
};

export default CourseCard;
