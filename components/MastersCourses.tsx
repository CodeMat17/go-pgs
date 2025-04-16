import {  Minus } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import CourseCard from "./CourseCard";

const MastersCourses = () => {

const mastersCourses = useQuery(api.courses.getCoursesByType, {type: 'masters'})

  return (
    <div>
      <h1 className='text-xl font-medium'>Our Master&apos;s Courses</h1>
      {mastersCourses === undefined ? (
        <div className='flex items-center p-8 text-muted-foreground'>
          <Minus className='animate-spin mr-3' /> Master&apos;s courses loading...
        </div>
      ) : mastersCourses.length < 1 ? (
        <div className='p-8 text-muted-foreground'>
          No Master&apos;s Courses available at the moment.
        </div>
      ) : (
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {
            mastersCourses.map((msc) => (
              <CourseCard
                key={msc._id}
                course={msc.course}
                slug={msc.slug}
                duration={msc.duration}
                mode={msc.mode}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default MastersCourses;
