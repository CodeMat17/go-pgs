
import ResearchContent from "@/components/research/ResearchContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cutting-Edge Research | GO University Postgraduate School",
  description:
    "Explore groundbreaking research initiatives, funded projects, and academic publications across our postgraduate research programs. Join Nigeria's hub of research innovation.",
  keywords: [
    "postgraduate research opportunities",
    "academic research Nigeria",
    "PhD research programs",
    "research facilities",
    "research publications",
    "STEM research Africa",
  ],
  openGraph: {
    title: "Research Excellence & Innovation - GO Uni Postgrad",
    description:
      "Interdisciplinary research programs addressing global challenges in Technology, Health Sciences, Sustainable Development, and Social Innovation",
    images: [
      {
        url: "https://pg.gouni.edu.ng/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "GO University Research Laboratory Team",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Research at GO Uni Postgraduate School",
    description:
      "Pioneering African research with global impact - Explore our funded projects and collaborative opportunities",
    images: ["https://pg.gouni.edu.ng/opengraph-image.jpg"],
  },
  alternates: {
    canonical: "https://pg.gouni.edu.ng/research",
  },
};

export default function ResearchPage() {
  return (
  <ResearchContent />
  );
}
