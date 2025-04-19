"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import dayjs from "dayjs";
import { Eye, Share2 } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import DOMPurify from "dompurify";

export default function NewsContent() {
  const params = useParams();

  const slug = useMemo(() => {
    if (!params?.slug) return null;
    return Array.isArray(params.slug) ? params.slug[0] : params.slug;
  }, [params]);

  const news = useQuery(api.news.getNewsBySlug, slug ? { slug } : "skip");
  const incrementViews = useMutation(api.news.incrementViews);

  useEffect(() => {
    if (news?.slug) {
      incrementViews({ slug: news.slug });
    }
  }, [news?.slug, incrementViews]);

  // Add structured data for SEO
 useEffect(() => {
   if (news) {
     const structuredData = {
       "@context": "https://schema.org",
       "@type": "NewsArticle",
       headline: news.title,
       image: news.coverImage ? [news.coverImage] : [],
       datePublished: news.publicationDate || news._creationTime,
       author: {
         "@type": "Person",
         name: news.author,
       },
     };
     const script = document.createElement("script");
     script.type = "application/ld+json";
     script.text = JSON.stringify(structuredData);
     document.head.appendChild(script);

     // Return cleanup function with void return type
     return () => {
       document.head.removeChild(script);
     };
   }
 }, [news]);

  const sanitizedContent = useMemo(
    () => ({
      __html: news?.content ? DOMPurify.sanitize(news.content) : "",
    }),
    [news?.content]
  );

  if (!slug) {
    return (
      <div
        className='w-full min-h-screen flex items-center justify-center'
        aria-live='polite'>
        <p className='text-center text-lg text-muted-foreground'>
          Invalid URL — missing slug.
        </p>
      </div>
    );
  }

  if (news === undefined) {
    return (
      <div className='w-full min-h-screen px-4 py-12 max-w-4xl mx-auto'>
        <div
          className='animate-pulse space-y-8'
          aria-label='Loading news article'>
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

  if (!news) {
    return (
      <div
        className='w-full min-h-screen flex items-center justify-center'
        aria-live='polite'>
        <p className='text-center text-lg text-muted-foreground'>
          News article not found.
        </p>
      </div>
    );
  }

  const handleShare = async (slug: string) => {
    const url = `${window.location.origin}/news/${slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: news.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        // Replace with toast implementation
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  return (
    <div className='w-full min-h-screen px-4 py-12'>
      <main className='max-w-3xl mx-auto'>
        {news.coverImage && (
          <div className='mb-6 relative h-72 w-full aspect-video'>
            <Image
              src={news.coverImage}
              alt={news.title}
              fill
              className='rounded-lg object-cover'
              sizes='(max-width: 768px) 100vw, 80vw'
              priority
              placeholder='blur'
              blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
            />
          </div>
        )}

        <h1 className='text-3xl md:text-4xl font-bold mb-4'>{news.title}</h1>

        <div className='flex flex-col sm:flex-row sm:justify-between mb-4 text-muted-foreground'>
          <div className='flex items-center gap-2 text-sm'>
            <span
              className='w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center text-gray-100 shrink-0 text-sm'
              aria-hidden='true'>
              By
            </span>
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4'>
              <p className='pt-1 sm:pt-0'>{news.author}</p>
              <span className='hidden sm:flex' aria-hidden='true'>
                |
              </span>
              <time
                dateTime={dayjs(
                  news.publicationDate || news._creationTime
                ).format("YYYY-MM-DDTHH:mm")}
                className='block'>
                {dayjs(news.publicationDate || news._creationTime).format(
                  "MMM DD, YYYY h:mm a"
                )}
              </time>
            </div>
          </div>
        </div>

        <div className='flex items-center text-sm mt-1 mb-8 text-muted-foreground'>
          <div className='flex items-center gap-1 mr-5'>
            <Eye className='w-4 h-4' aria-hidden='true' />
            <p>{news.views.toLocaleString()} views</p>
          </div>
          <span aria-hidden='true'>•</span>
          <button
            className='flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 px-4 py-2 rounded-full text-xs font-medium transition-colors'
            onClick={() => handleShare(news.slug)}
            aria-label='Share this article'>
            <Share2 className='w-4 h-4' aria-hidden='true' />
            Share
          </button>
        </div>

        <article className='prose dark:prose-invert max-w-none'>
          <div dangerouslySetInnerHTML={sanitizedContent} />
        </article>
      </main>
    </div>
  );
}
