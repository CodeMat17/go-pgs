

import RequirementsContent from "@/components/requirements/RequirementContents";
import { Metadata } from "next";



export const metadata: Metadata = {
  title: "Admission Requirements for Postgraduate Programs",
  description: "Entry requirements for Masters, PhD, and PGD programs",
  keywords: ["postgraduate admission criteria", "application process"],
  openGraph: {
    title: "Postgraduate Admission Requirements",
    images: [{ url: "/opengraph-image.jpg" }],
  },
};

export default function RequirementsPage() {
 

  return (
  <RequirementsContent />
    
  );
}
