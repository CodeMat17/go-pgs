import NewsPage from "@/components/news/NewsPage";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Latest News & Updates | Godfrey Okoye Postgraduate School",
  description:
    "Stay informed with the latest research breakthroughs, campus news, and academic updates from GO University Postgraduate School.",
  openGraph: {
    title: "News & Announcements - GO University Postgrad",
    description:
      "Official news portal for Godfrey Okoye University postgraduate programs and research initiatives",
    images: [
      {
        url: "https://pg.gouni.edu.ng/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "GO University News Bulletin",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "GO Uni Postgrad News",
    description:
      "Latest updates from Nigeria's leading postgraduate institution",
    images: ["https://pg.gouni.edu.ng/opengraph-image.jpg"],
  },
};

export default function NewsPageWrapper() {

  return <NewsPage />;
}
