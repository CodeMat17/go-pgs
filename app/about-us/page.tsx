import AboutUsContent from '@/components/aboutUs/AboutUsContent'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "About Our Postgraduate School",
  description:
    "Discover our history, mission, and commitment to postgraduate education excellence in Nigeria.",
  keywords: ["about GO uni postgrad", "postgraduate school history"],
  openGraph: {
    title: "About Our Postgraduate Programs",
    images: [{ url: "/opengraph-image.jpg" }],
  },
};

export default function AboutUsPage() {


  return (
  <AboutUsContent />
  );
}
