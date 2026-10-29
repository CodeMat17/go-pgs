import NewsPage from "@/components/news/NewsPage";
import { getNewsList } from "@/lib/server-data";
import { Metadata } from "next";

// Static; rebuilt only when /api/revalidate expires a tag this route reads.
export const revalidate = false;

export const metadata: Metadata = {
  title: "News & Updates | GO University Postgraduate School",
  description:
    "Stay informed with the latest research breakthroughs, campus news, and academic updates from GO University Postgraduate School.",
  alternates: {
    canonical: "https://pg.gouni.edu.ng/news",
  },
};

export default async function NewsPageWrapper() {
  const initialNews = await getNewsList();
  return <NewsPage initialNews={initialNews} />;
}
