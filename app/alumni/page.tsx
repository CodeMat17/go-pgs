import AlumniDetail from "@/components/alumni/AlumniDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Alumni Network | GO University Postgraduate School",
  description:
    "Discover how GO University postgraduate alumni are making a global impact. Explore success stories from our distinguished graduates.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/alumni",
  },
};

export default function AlumniPage() {
  return <AlumniDetail />;
}
