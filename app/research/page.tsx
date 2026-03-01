import ResearchContent from "@/components/research/ResearchContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research | GO University Postgraduate School",
  description:
    "Explore groundbreaking research initiatives, facilities, and academic publications at GO University Postgraduate School. Join Nigeria's hub of research innovation.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/research",
  },
};

export default function ResearchPage() {
  return <ResearchContent />;
}
