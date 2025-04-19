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
    description:
      "Nigeria's leading postgraduate institution offering world-class Masters, PhD and PGD programs. Start your advanced degree journey today.",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "GO University",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GO Uni Postgrad",
    description:
      "Nigeria's leading postgraduate institution offering world-class Masters, PhD and PGD programs. Start your advanced degree journey today.",
    images: ["https://pg.gouni.edu.ng/opengraph-image.jpg"],
  },
  alternates: {
    canonical: "https://pg.gouni.edu.ng",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
