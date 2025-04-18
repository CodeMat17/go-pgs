import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import NewsDetailContent from "@/components/news/NewsDetailContent";

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const news = await fetchQuery(api.news.getNewsBySlug, { slug: params.slug });

  const baseUrl = process.env.NODE_ENV === "production" ? "https://pg.gouni.edu.ng" : "http://localhost:3000"

  if (!news) {
    return {
      title: "News Not Found - GO University",
      description: "The requested news article could not be found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${news.title} | GO University News`,
    description:
      news.content.slice(0, 160).replace(/<[^>]+>/g, "") ||
      `Latest news update: ${news.title}`,
    openGraph: {
      title: news.title,
      description:
        news.content.slice(0, 160).replace(/<[^>]+>/g, "") ||
        `Read the full article about ${news.title}`,
      images: news.coverImage
        ? [
            {
              url: new URL(news.coverImage, baseUrl).toString(),
              width: 1200,
              height: 630,
              alt: news.title,
            },
          ]
        : [
            {
              url: `${baseUrl}/opengraph-image.jpg`,
              width: 1200,
              height: 630,
              alt: "GO University News",
            },
          ],
      publishedTime: news._creationTime.toLocaleString(),
      modifiedTime: news.updatedOn?.toString(),
      authors: [news.author],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: news.title,
      description:
        news.content.slice(0, 150).replace(/<[^>]+>/g, "") + "..." ||
        `Read about ${news.title}`,
      images: news.coverImage
        ? new URL(news.coverImage, baseUrl).toString()
        : `${baseUrl}/opengraph-image.jpg`,
    },
    alternates: {
      canonical: `/news/${params.slug}`,
    },
    other: {
      "article:published_time": news._creationTime.toLocaleString(),
      "article:modified_time": news.updatedOn?.toString() || "",
      "article:author": news.author,
      "article:section": "Education News",
    },
  };
}

export default function NewsDetailWrapper({ params }: Props) {
  
const slug = params.slug

  return <NewsDetailContent slug={slug} />;
}
