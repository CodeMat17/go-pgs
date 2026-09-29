"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import dayjs from "dayjs";
import DOMPurify from "dompurify";
import { ArrowLeft, Calendar, Eye, Images, Share2, User } from "lucide-react";
import { liveAssetUrl } from "@/lib/assets";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function NewsContent({
  initialNews,
  initialHtml,
}: {
  initialNews?: Doc<"news"> | null;
  /** Server-sanitized body matching initialNews.content */
  initialHtml?: string;
}) {
  const params = useParams();

  const slug = useMemo(() => {
    if (!params?.slug) return null;
    return Array.isArray(params.slug) ? params.slug[0] : params.slug;
  }, [params]);

  // Server-rendered data seeds the first paint; the live query takes over once connected.
  const liveNews = useQuery(api.news.getNewsBySlug, slug ? { slug } : "skip");
  const news = liveNews === undefined ? initialNews : liveNews;
  const incrementViews = useMutation(api.news.incrementViews);
  const [previewImage, setPreviewImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    if (news?.slug) {
      incrementViews({ slug: news.slug });
    }
  }, [news?.slug, incrementViews]);

  const sanitizedContent = useMemo(
    () => ({
      __html: !news?.content
        ? ""
        : initialHtml !== undefined && news.content === initialNews?.content
          ? initialHtml
          : DOMPurify.sanitize(news.content),
    }),
    [news?.content, initialHtml, initialNews?.content]
  );

  const handleShare = async () => {
    if (!news) return;
    const url = `${window.location.origin}/news/${news.slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: news.title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

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

  // ── Loading skeleton ──────────────────────────────────────────────────────
  if (news === undefined) {
    return (
      <div className='min-h-screen bg-background'>
        <Skeleton className='w-full aspect-[3/1] rounded-none' />
        <div className='max-w-3xl mx-auto px-4 sm:px-6 py-10 space-y-4'>
          <Skeleton className='h-3 w-20 rounded-full' />
          <Skeleton className='h-8 w-4/5 rounded-lg' />
          <Skeleton className='h-8 w-3/5 rounded-lg' />
          <div className='flex gap-4 pt-3'>
            <Skeleton className='h-4 w-28 rounded-lg' />
            <Skeleton className='h-4 w-24 rounded-lg' />
            <Skeleton className='h-4 w-20 rounded-lg' />
          </div>
          <div className='pt-6 space-y-3'>
            {[...Array(10)].map((_, i) => (
              <Skeleton
                key={i}
                className={`h-4 rounded-lg ${i % 5 === 4 ? "w-2/3" : "w-full"}`}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  // ── Not found ─────────────────────────────────────────────────────────────
  if (!news) {
    return (
      <div
        className='w-full min-h-screen flex flex-col items-center justify-center gap-4'
        aria-live='polite'>
        <p className='text-center text-lg text-muted-foreground'>
          Article not found.
        </p>
        <Link
          href='/news'
          className='text-sm text-primary hover:underline font-semibold flex items-center gap-1.5'>
          <ArrowLeft className='w-4 h-4' /> Back to News
        </Link>
      </div>
    );
  }

  // Extra images beyond the cover (images[0].url === coverImage)
  const extraImages =
    news.images && news.images.length > 1
      ? news.images.slice(1).filter((img) => liveAssetUrl(img.url))
      : [];

  return (
    <div className='min-h-screen bg-background'>
      {/* ── Cover Image / Hero ────────────────────────────────────────── */}
      {liveAssetUrl(news.coverImage) ? (
        <div className='relative w-full max-w-3xl mx-auto aspect-video overflow-hidden'>
          <Image
            src={liveAssetUrl(news.coverImage)!}
            alt={news.title}
            fill
            className='object-cover object-top'
            sizes='(max-width: 768px) 100vw, 768px'
            priority
            placeholder='blur'
            blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII='
          />
          <div className='absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent' />
          <div className='absolute bottom-0 left-0 right-0'>
            <div className='max-w-3xl mx-auto px-4 sm:px-6 pb-8'>
              <Link
                href='/news'
                className='inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors'>
                <ArrowLeft className='w-4 h-4' /> All News
              </Link>
              <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight'>
                {news.title}
              </h1>
            </div>
          </div>
        </div>
      ) : (
        <div className='hero-brand py-16 sm:py-20'>
          <div className='relative max-w-3xl mx-auto px-4 sm:px-6'>
            <Link
              href='/news'
              className='inline-flex items-center gap-1.5 text-white/70 hover:text-white text-sm mb-5 transition-colors'>
              <ArrowLeft className='w-4 h-4' /> All News
            </Link>
            <h1 className='text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight'>
              {news.title}
            </h1>
          </div>
        </div>
      )}

      {/* ── Article Body ─────────────────────────────────────────────── */}
      <article className='max-w-3xl mx-auto px-4 sm:px-6 py-10'>
        {/* Meta bar */}
        <div className='flex flex-wrap items-center gap-x-5 gap-y-2 mb-3 pb-4 border-b border-border text-sm text-muted-foreground'>
          <span className='flex items-center gap-1.5'>
            <User className='w-4 h-4 flex-shrink-0' />
            {news.author}
          </span>
          <span className='flex items-center gap-1.5'>
            <Calendar className='w-4 h-4 flex-shrink-0' />
            <time
              dateTime={dayjs(
                news.publicationDate || news._creationTime,
              ).format("YYYY-MM-DD")}>
              {dayjs(news.publicationDate || news._creationTime).format(
                "MMM DD, YYYY",
              )}
            </time>
          </span>
          <span className='flex items-center gap-1.5'>
            <Eye className='w-4 h-4 flex-shrink-0' />
            {news.views.toLocaleString()} views
          </span>
          {news.images && news.images.length > 1 && (
            <span className='flex items-center gap-1.5 text-primary font-medium'>
              <Images className='w-4 h-4 flex-shrink-0' />
              {news.images.length} photos
            </span>
          )}
          <button
            onClick={handleShare}
            className='flex items-center gap-1.5 ml-auto hover:text-foreground transition-colors'
            aria-label='Share this article'>
            <Share2 className='w-4 h-4' />
            Share
          </button>
        </div>

        {/* ── Photo Gallery ──────────────────────────────────────────── */}
        {extraImages.length > 0 && (
          <section className=''>
            <h2 className='text-sm text-muted-foreground mb-5 flex items-center gap-2'>
              <Images className='w-4 h-4' aria-hidden='true' />
              Photo Gallery
              <span className='text-sm font-normal text-muted-foreground'>
                ({extraImages.length} photo
                {extraImages.length !== 1 ? "s" : ""})
              </span>
            </h2>
            <div
              className={`grid gap-3 mb-8 ${
                extraImages.length === 1
                  ? "grid-cols-1"
                  : extraImages.length === 2
                    ? "grid-cols-2"
                    : "grid-cols-2 sm:grid-cols-3"
              }`}>
              {extraImages.map((img, i) => (
                <button
                  type='button'
                  key={img.storageId}
                  onClick={() =>
                    setPreviewImage({
                      src: img.url,
                      alt: `${news.title} — photo ${i + 2}`,
                    })
                  }
                  className='relative block w-full aspect-[4/3] rounded-xl overflow-hidden border border-border bg-muted cursor-zoom-in'
                  aria-label={`View photo ${i + 2} larger`}>
                  <Image
                    src={img.url}
                    alt={`${news.title} — photo ${i + 2}`}
                    fill
                    className='object-cover hover:scale-105 transition-transform duration-500'
                    sizes='(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw'
                  />
                </button>
              ))}
            </div>
          </section>
        )}

        {/* Article content */}
        <article className='prose dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-primary prose-img:rounded-xl prose-img:h-auto prose-img:max-w-full prose-img:cursor-zoom-in'>
          <div
            dangerouslySetInnerHTML={sanitizedContent}
            onClick={(e) => {
              const target = e.target as HTMLElement;
              if (target instanceof HTMLImageElement) {
                setPreviewImage({ src: target.src, alt: target.alt });
              }
            }}
          />
        </article>

        {/* Enlarged image preview */}
        <Dialog
          open={!!previewImage}
          onOpenChange={(open) => !open && setPreviewImage(null)}>
          <DialogContent className='w-[calc(100%-2rem)] max-w-4xl p-2 [&>button]:bg-background [&>button]:rounded-full [&>button]:p-1'>
            <DialogTitle className='sr-only'>
              {previewImage?.alt || "Image preview"}
            </DialogTitle>
            {previewImage && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={previewImage.src}
                alt={previewImage.alt}
                className='block mx-auto w-auto h-auto max-w-full max-h-[85vh] rounded-md'
              />
            )}
          </DialogContent>
        </Dialog>

        {/* Back link */}
        <div className='mt-12 pt-8 border-t border-border'>
          <Link
            href='/news'
            className='inline-flex items-center gap-2 text-sm text-primary hover:underline font-semibold'>
            <ArrowLeft className='w-4 h-4' />
            Back to all news
          </Link>
        </div>
      </article>
    </div>
  );
}
