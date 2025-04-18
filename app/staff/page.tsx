import StaffDetail from "@/components/staff/StaffDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "GO Uni Staff Profile",
  description:
    "Meet our distinguished staff members and postgraduate program coordinators.",
  keywords: ["postgraduate lecturers", "academic staff profiles"],
  openGraph: {
    title: "Postgraduate staff Members",
    images: [{ url: "/opengraph-image.jpg" }],
  },
};

export default function StaffPage() {
  return <StaffDetail />;
}
