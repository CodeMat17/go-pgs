import CampusCommunityContent from "@/components/campus/CampusCommunityContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Campus Community | GO University Postgraduate School",
  description:
    "Explore student spotlights and original articles from the GO University postgraduate community — stories, research, and voices from our scholars.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/campus-community",
  },
};

export default function CampusCommunityPage() {
  return <CampusCommunityContent />;
}
