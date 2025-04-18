"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import dayjs from "dayjs";
import { Eye, Share2 } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect } from "react";

export default function NewsDetailContent({slug}: {slug: string}) {
  // const params = useParams();
  // const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;

  const newsItem = useQuery(api.news.getNewsBySlug, slug ? { slug } : "skip");
  const incrementViews = useMutation(api.news.incrementViews);

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/news/${slug}`;

    if (navigator.share) {
      navigator.share({
        title: "Check out this news article",
        url: url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    if (newsItem?.slug && slug) {
      incrementViews({ slug });
    }
  }, [newsItem?.slug, slug, incrementViews]);

  if (newsItem === null) {
    notFound();
  }

  if (!newsItem) {
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

  return (
    <div className='w-full min-h-screen px-4 py-12'>
      <div className='max-w-3xl mx-auto'>
        {newsItem.coverImage && (
          <div className='mb-6 relative h-72 w-full object-cover aspect-video'>
            <Image
              src={newsItem.coverImage}
              alt={newsItem.title}
              fill
              className='rounded-lg object-cover'
              sizes='(max-width: 768px) 100vw, 80vw'
              priority
            />
          </div>
        )}
        <h1 className='text-4xl font-bold mb-4'>{newsItem.title}</h1>

        <div className='flex flex-col sm:flex-row sm:justify-between mb-4'>
          <div className='flex items-center gap-2 text-sm'>
            <span className='w-8 h-8 bg-gray-500/70 rounded-full flex items-center justify-center text-white shrink-0 text-sm'>
              By
            </span>
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4'>
              <p className='text-primary pt-1 sm:pt-0'>{newsItem.author}</p>
              <span className='hidden sm:flex'>|</span>
              <p>
                {dayjs(newsItem.publicationDate).format("MMM DD, YYYY h:m a")}
              </p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2 text-sm mt-1 mb-8'>
          <div className='flex items-center gap-1 mr-3'>
            <Eye className='w-4 h-4' />
            <p>{newsItem.views} views</p>
          </div>
          <p>•</p>
          <button
            className='flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-950 px-4 py-2 rounded-full text-xs font-medium'
            onClick={() => handleShare(newsItem.slug)}>
            <Share2 className='w-4 h-4' /> Share
          </button>
        </div>

        <article className='prose dark:prose-invert max-w-none'>
          <div dangerouslySetInnerHTML={{ __html: newsItem.content }} />
        </article>
      </div>
    </div>
  );
}
