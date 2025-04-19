import HomeContent from "@/components/home/HomeContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home | Premier Postgraduate Education in Nigeria",
  description:
    "Nigeria's leading postgraduate institution offering world-class Masters, PhD and PGD programs. Start your advanced degree journey today.",
  keywords: [
    "postgraduate programs Nigeria",
    "Masters degree Enugu",
    "PhD courses",
  ],
  openGraph: {
    title: "GO University Postgraduate School",
    description: "Accredited postgraduate education with research excellence",
    images: [{ url: "/opengraph-image.jpg" }],
  },
};

export default function HomePage() {
  return <HomeContent />;
}
