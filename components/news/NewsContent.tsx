"use client";

import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import dayjs from "dayjs";
import { Eye, Share2 } from "lucide-react";
import Image from "next/image";
import { useEffect } from "react";

export type News = {
  _id: string;
  title: string;
  author: string;
  slug: string;
  content: string;
  coverImage?: string;
  views: number;
  publicationDate?: string | number | Date;
  updatedOn?: string;
  _creationTime: number;
};

type NewsContentProps = {
  news: News;
};

export default function NewsContent({ news }: NewsContentProps) {
  const incrementViews = useMutation(api.news.incrementViews);

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/news/${slug}`;

    if (navigator.share) {
      navigator.share({
        title: "Check out this news article",
        url,
      });
    } else {
      navigator.clipboard.writeText(url);
      alert("Link copied to clipboard!");
    }
  };

  useEffect(() => {
    if (news?.slug) {
      incrementViews({ slug: news.slug });
    }
  }, [news?.slug, incrementViews]);

  return (
    <div className='w-full min-h-screen px-4 py-12'>
      <div className='max-w-3xl mx-auto'>
        {news.coverImage && (
          <div className='mb-6 relative h-72 w-full object-cover aspect-video'>
            <Image
              src={news.coverImage}
              alt={news.title}
              fill
              className='rounded-lg object-cover'
              sizes='(max-width: 768px) 100vw, 80vw'
              priority
            />
          </div>
        )}
        <h1 className='text-4xl font-bold mb-4'>{news.title}</h1>

        <div className='flex flex-col sm:flex-row sm:justify-between mb-4'>
          <div className='flex items-center gap-2 text-sm'>
            <span className='w-8 h-8 bg-gray-500/70 rounded-full flex items-center justify-center text-white shrink-0 text-sm'>
              By
            </span>
            <div className='flex flex-col sm:flex-row sm:items-center sm:gap-4'>
              <p className='text-primary pt-1 sm:pt-0'>{news.author}</p>
              <span className='hidden sm:flex'>|</span>
              <p>{dayjs(news.publicationDate).format("MMM DD, YYYY h:mm a")}</p>
            </div>
          </div>
        </div>

        <div className='flex items-center gap-2 text-sm mt-1 mb-8'>
          <div className='flex items-center gap-1 mr-3'>
            <Eye className='w-4 h-4' />
            <p>{news.views} views</p>
          </div>
          <p>•</p>
          <button
            className='flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-950 px-4 py-2 rounded-full text-xs font-medium'
            onClick={() => handleShare(news.slug)}>
            <Share2 className='w-4 h-4' /> Share
          </button>
        </div>

        <article className='prose dark:prose-invert max-w-none'>
          <div dangerouslySetInnerHTML={{ __html: news.content }} />
        </article>
      </div>
    </div>
  );
}
