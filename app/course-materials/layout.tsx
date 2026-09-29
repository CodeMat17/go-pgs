import { Metadata } from "next";

// The page itself is a client component, so its metadata lives here.
export const metadata: Metadata = {
  title: "Course Materials | GO University Postgraduate School",
  description:
    "Enter your registration number to download lecture notes and course materials for your GO University postgraduate programme.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/course-materials",
  },
};

export default function CourseMaterialsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
