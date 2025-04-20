import StaffDetail from "@/components/staff/StaffDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GO Uni Staff Profile",
  description:
    "Meet our distinguished staff members and postgraduate program coordinators.",
  keywords: ["postgraduate lecturers", "academic staff profiles"],
  openGraph: {
    title: "Postgraduate staff Members",
    description:
      "Meet our distinguished staff members and postgraduate program coordinators.",
    images: [
      {
        url: "/staff/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "GO University News Bulletin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Postgraduate staff Members",
    description:
      "Meet our distinguished staff members and postgraduate program coordinators.",
    images: ["https://pg.gouni.edu.ng/staff/opengraph-image.jpg"],
  },
  alternates: {
    canonical: "https://pg.gouni.edu.ng/staff",
  },
};

export default function StaffPage() {
  return <StaffDetail />;
}
