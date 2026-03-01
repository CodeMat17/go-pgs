import FeesContainer from "@/components/fees/FeesContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fee Structure | GO University Postgraduate School",
  description:
    "Download the official postgraduate fee schedule for GO University. View tuition fees for PGD, Masters, and PhD programmes.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/fees",
  },
};

export default function FeesPage() {
  return <FeesContainer />;
}
