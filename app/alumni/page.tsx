import AlumniDetail from "@/components/alumni/AlumniDetail";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Postgraduate Alumni Network",
  description: "Join our global network of successful postgraduate alumni",
  keywords: ["postgraduate alumni stories", "alumni association"],
  openGraph: {
    title: "GO Uni Postgraduate Alumni Community",
    description: "Join our global network of successful postgraduate alumni",
    images: [
      {
        url: "/alumni/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "GO University Postgrad Alumni Network",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GO Uni Postgrad Alumni Community",
    description: "Join our global network of successful postgraduate alumni",
    images: ["https://pg.gouni.edu.ng/alumni/opengraph-image.jpg"],
  },
  alternates: {
    canonical: "https://pg.gouni.edu.ng/alumni",
  },
};

export default function AlumniPage() {
  return <AlumniDetail />;
}
