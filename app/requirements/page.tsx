import RequirementsContent from "@/components/requirements/RequirementContents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admission Requirements for Postgraduate Programs",
  description: "Entry requirements for Masters, PhD, and PGD programs",
  keywords: ["postgraduate admission criteria", "application process"],
  openGraph: {
    title: "Postgraduate Admission Requirements",
    description: "Entry requirements for Masters, PhD, and PGD programs",
    images: [
      {
        url: "/requirements/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "GO University News Bulletin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Postgraduate Admission Requirements",
    description: "Entry requirements for Masters, PhD, and PGD programs",
    images: ["https://pg.gouni.edu.ng/requirements/opengraph-image.jpg"],
  },
  alternates: {
    canonical: "https://pg.gouni.edu.ng/requirements",
  },
};

export default function RequirementsPage() {
  return <RequirementsContent />;
}
