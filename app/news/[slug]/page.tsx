import NewsContent from "@/components/news/NewsContent";
import { api } from "@/convex/_generated/api";
// import { notFound } from "next/navigation";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";


export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Await params first
  const { slug } = await params;

  const news = await fetchQuery(api.news.getNewsBySlug, { slug });

  if (!news) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
      robots: "noindex, nofollow",
    };
  }

  const baseUrl = process.env.SITE_URL || "http://localhost:3000";

  return {
    title: `${news.title}`,
    description: truncate(news.content, 160),
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/news/${slug}`,
    },
    openGraph: {
      title: news.title,
      description: truncate(news.content, 160),
      type: "article",
      publishedTime: new Date(news._creationTime).toISOString(),
      url: `/news/${slug}`,
      images: news.coverImage
        ? [
            {
              url: news.coverImage,
              width: 1200,
              height: 630,
              alt: news.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description: truncate(news.content, 160),
      images: news.coverImage ? [news.coverImage] : [],
    },
  };
}

const truncate = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;

export default async function NewsDetailPage() {
  //  const {slug} = await params;
  // const news = await fetchQuery(api.news.getNewsBySlug, { slug });

  // if (!news) return notFound();

  return <NewsContent />;
}
