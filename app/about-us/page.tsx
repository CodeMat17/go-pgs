import AboutUsContent from '@/components/aboutUs/AboutUsContent'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Our Postgraduate School",
  description:
    "Discover our history, mission, and commitment to postgraduate education excellence in Nigeria.",
  keywords: ["about GO uni postgrad", "postgraduate school history"],
  openGraph: {
    title: "About Our Postgraduate Programs",
    description:
      "Discover our history, mission, and commitment to postgraduate education excellence in Nigeria.",
    images: [
      {
        url: "/about-us/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "About GO University Postgraduate School Bulletin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About GO Uni Postgraduate School",
    description:
      "Discover our history, mission, and commitment to postgraduate education excellence in Nigeria.",
    images: ["https://pg.gouni.edu.ng/about-us/opengraph-image.jpg"],
  },
  alternates: {
    canonical: "https://pg.gouni.edu.ng/about-us",
  },
};

export default function AboutUsPage() {


  return (
  <AboutUsContent />
  );
}
