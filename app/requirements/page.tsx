import RequirementsContent from "@/components/requirements/RequirementContents";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admission Requirements | GO University Postgraduate School",
  description:
    "View entry requirements for Masters, PhD, and PGD programmes at GO University Postgraduate School. Learn what you need to apply.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/requirements",
  },
};

export default function RequirementsPage() {
  return <RequirementsContent />;
}
