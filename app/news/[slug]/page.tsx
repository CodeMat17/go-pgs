import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const NewsContent = dynamic(() => import("@/components/news/NewsContent"));

type Props = {
  params: {
    slug: string;
  };
};


const fetchNewsItem = async (slug: string) => {
  try {
    return await fetchQuery(api.news.getNewsBySlug, { slug });
  } catch (error) {
    console.error("News fetch error:", error);
    return null;
  }
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  // Ensure slug is properly decoded and validated
  const newsItem = await fetchNewsItem(params.slug);

  if (!newsItem) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
      robots: "noindex, nofollow",
    };
  }

  // Construct metadata values
  const baseUrl = process.env.SITE_URL || "http://localhost:3000";
  const metadataBase = new URL(baseUrl);

  // Convert Convex timestamps to ISO strings
  const publishedTime = new Date(newsItem._creationTime).toISOString();
  const modifiedTime = newsItem.updatedOn
    ? new Date(newsItem.updatedOn).toISOString()
    : publishedTime;
  
  
  const canonicalUrl = `${baseUrl}/news/${params.slug}`;

  const description = newsItem.excerpt
    ? truncate(newsItem.excerpt, 160)
    : truncate(newsItem.content || "", 160);

  // Structured metadata configuration
  return {
    metadataBase,
    title: `${newsItem.title} | GOUNI Postgrad`,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: "article",
      publishedTime,
      modifiedTime,
      url: canonicalUrl,
      images: newsItem.coverImage
        ? [
            {
              url: new URL(newsItem.coverImage, metadataBase).toString(),
              width: 1200,
              height: 630,
              alt: newsItem.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: newsItem.title,
      description,
      images: newsItem.coverImage
        ? [new URL(newsItem.coverImage, metadataBase).toString()]
        : [],
    },
    ...(newsItem.tags?.length && { keywords: newsItem.tags.join(", ") }),
  };
}

// Utility function for text truncation
const truncate = (text: string, maxLength: number): string =>
  text.length > maxLength ? `${text.slice(0, maxLength - 1)}…` : text;

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = params;
  const news = await fetchQuery(api.news.getNewsBySlug, { slug });

  if (!news) {
    return (
      <div className='w-full min-h-screen px-4 py-12 max-w-4xl mx-auto'>
        <div className='animate-pulse space-y-8'>
          <div className='h-48 bg-muted rounded-lg mb-8' />
          <div className='h-8 bg-muted rounded w-3/4 mb-4' />
          <div className='space-y-4'>
            <div className='h-4 bg-muted rounded w-full' />
            <div className='h-4 bg-muted rounded w-2/3' />
          </div>
        </div>
      </div>
    );
  }

  return <NewsContent news={news} />;
}
