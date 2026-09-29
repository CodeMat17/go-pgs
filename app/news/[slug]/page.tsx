import NewsContent from "@/components/news/NewsContent";
import {
  excerpt,
  getNewsBySlug,
  getNewsList,
  sanitizeArticleHtml,
} from "@/lib/server-data";
import { Metadata } from "next";

export const revalidate = 60;

export async function generateStaticParams() {
  const news = await getNewsList();
  return news.map(({ slug }) => ({ slug }));
}

const baseUrl = "https://pg.gouni.edu.ng";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  if (!news) {
    return {
      title: "Article Not Found",
      description: "The requested article could not be found",
      robots: "noindex, nofollow",
    };
  }

  const description = excerpt(news.content, 155);

  return {
    title: `${news.title}`,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/news/${slug}`,
    },
    openGraph: {
      title: news.title,
      description,
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
      description,
      images: news.coverImage ? [news.coverImage] : [],
    },
  };
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);

  const jsonLd = news && {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: news.title,
    description: excerpt(news.content, 200),
    image: news.coverImage ? [news.coverImage] : [],
    datePublished: new Date(
      news.publicationDate || news._creationTime
    ).toISOString(),
    author: { "@type": "Person", name: news.author },
    publisher: {
      "@type": "CollegeOrUniversity",
      name: "Godfrey Okoye University Postgraduate School",
      url: baseUrl,
    },
    mainEntityOfPage: `${baseUrl}/news/${slug}`,
  };

  return (
    <>
      {jsonLd && (
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <NewsContent
        initialNews={news}
        initialHtml={news ? sanitizeArticleHtml(news.content) : undefined}
      />
    </>
  );
}
