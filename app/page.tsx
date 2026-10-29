import HomeContent from "@/components/home/HomeContent";
import { getNewsList } from "@/lib/server-data";
import { Metadata } from "next";

// Static; rebuilt only when /api/revalidate expires a tag this route reads.
export const revalidate = false;

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

export default async function HomePage() {
  const initialNews = await getNewsList();
  return <HomeContent initialNews={initialNews} />;
}
