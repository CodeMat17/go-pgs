import LectureTimetableContent from "@/components/timetable/LectureTimetableContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Lecture Timetable | GO University Postgraduate School",
  description:
    "View and download the official postgraduate lecture timetable for GO University. Preview faculty schedules directly on this page.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/lecture-timetable",
  },
};

export default function LectureTimetablePage() {
  return <LectureTimetableContent />;
}
