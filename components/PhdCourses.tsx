import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import { Minus } from "lucide-react";
import CourseCard from "./CourseCard";

const PhdCourses = () => {
  const phdCourses = useQuery(api.courses.getCoursesByType, { type: "phd" });

  return (
    <div>
      <h1 className='text-xl font-medium'>Our PhD Courses</h1>
      {phdCourses === undefined ? (
        <div className='flex items-center p-8 text-muted-foreground'>
          <Minus className='animate-spin mr-3' /> PhD courses loading...
        </div>
      ) : phdCourses.length < 1 ? (
        <div className='p-8 text-muted-foreground'>
          No PhD Courses available at the moment.
        </div>
      ) : (
        <div className='mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {phdCourses.map((phd) => (
            <CourseCard
              key={phd._id}
              course={phd.course}
              slug={phd.slug}
              duration={phd.duration}
              mode={phd.mode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default PhdCourses;
