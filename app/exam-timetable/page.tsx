import ExamTimetableContent from "@/components/timetable/ExamTimetableContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Exam Timetable | GO University Postgraduate School",
  description:
    "View and download the official postgraduate examination timetable for GO University. Preview semester schedules directly on this page.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/timetable",
  },
};

export default function ExamTimetablePage() {
  return <ExamTimetableContent />;
}
