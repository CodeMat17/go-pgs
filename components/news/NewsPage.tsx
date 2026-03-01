"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  CameraOff,
  Eye,
  Images,
  Newspaper,
  Search,
  Share2,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SortOption = "default" | "views_asc" | "views_desc";
const ITEMS_PER_PAGE = 12;

export default function NewsPage() {
  const newsList = useQuery(api.news.getNewsList);
  const shouldReduceMotion = useReducedMotion();
  const [titleSearch, setTitleSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string | undefined>();
  const [sortOrder, setSortOrder] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);

  const { uniqueAuthors, totalPages, paginatedNews } = useMemo(() => {
    if (!newsList)
      return { uniqueAuthors: [], totalPages: 0, paginatedNews: [] };

    const authors = Array.from(new Set(newsList.map((item) => item.author)));
    const filtered = newsList
      .filter((item) => {
        const matchesTitle = item.title
          .toLowerCase()
          .includes(titleSearch.toLowerCase());
        const matchesAuthor =
          !selectedAuthor || item.author === selectedAuthor;
        return matchesTitle && matchesAuthor;
      })
      .sort((a, b) => {
        if (sortOrder === "views_asc") return a.views - b.views;
        if (sortOrder === "views_desc") return b.views - a.views;
        return 0;
      });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedNews = filtered.slice(
      startIndex,
      startIndex + ITEMS_PER_PAGE
    );
    return { uniqueAuthors: authors, totalPages, paginatedNews };
  }, [newsList, titleSearch, selectedAuthor, sortOrder, currentPage]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [titleSearch, selectedAuthor, sortOrder]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === "INPUT") return;
      if (e.key === "ArrowLeft" && currentPage > 1)
        setCurrentPage((p) => p - 1);
      if (e.key === "ArrowRight" && currentPage < totalPages)
        setCurrentPage((p) => p + 1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  const handleShare = async (slug: string, title: string) => {
    const url = `${window.location.origin}/news/${slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ title, url });
      } else {
        await navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  const clearFilters = () => {
    setTitleSearch("");
    setSelectedAuthor(undefined);
    setSortOrder("default");
  };

  const hasActiveFilters = !!(
    titleSearch ||
    selectedAuthor ||
    sortOrder !== "default"
  );

  return (
    <div className='min-h-screen bg-background'>
      {/* ── Hero ───────────────────────────────────────────────────────── */}
      <section className='relative overflow-hidden bg-gradient-to-br from-primary dark:from-gray-700 via-primary/90 to-primary/80 py-16 sm:py-20 lg:py-24'>
        <div
          className='absolute inset-0 bg-[url("/pattern.png")] opacity-5'
          aria-hidden='true'
        />
        <div
          className='absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[#FFDC55]/10 blur-3xl pointer-events-none'
          aria-hidden='true'
        />
        <div
          className='absolute -bottom-16 -left-16 w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none'
          aria-hidden='true'
        />
        <div className='relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
          <span className='inline-block mb-4 px-4 py-1.5 rounded-full bg-[#FFDC55]/15 border border-[#FFDC55]/35 text-[#FFDC55] text-sm font-semibold tracking-wide'>
            News &amp; Updates
          </span>
          <h1 className='text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight'>
            Latest from GO University
          </h1>
          <p className='mt-4 text-white/70 text-base sm:text-lg max-w-2xl leading-relaxed'>
            Stay informed with the latest research breakthroughs, campus
            announcements, and academic milestones from our postgraduate school.
          </p>
        </div>
      </section>

      <section className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12'>
        {/* ── Filter Panel ─────────────────────────────────────────────── */}
        <div
          className='rounded-2xl border border-border bg-card p-5 mb-8 space-y-4'
          aria-label='News filters'>
          <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
            {/* Search */}
            <div className='relative'>
              <Search className='absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none' />
              <Input
                placeholder='Search articles…'
                value={titleSearch}
                onChange={(e) => setTitleSearch(e.target.value)}
                className='pl-9 pr-9'
                aria-label='Search news articles'
              />
              {titleSearch && (
                <button
                  onClick={() => setTitleSearch("")}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground'
                  aria-label='Clear search'>
                  <X className='h-4 w-4' />
                </button>
              )}
            </div>

            {/* Author filter */}
            <Select
              value={selectedAuthor ?? "all"}
              onValueChange={(v) =>
                setSelectedAuthor(v === "all" ? undefined : v)
              }>
              <SelectTrigger aria-label='Filter by author'>
                <SelectValue placeholder='All Authors' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='all'>All Authors</SelectItem>
                {uniqueAuthors.map((author) => (
                  <SelectItem key={author} value={author}>
                    {author}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select
              value={sortOrder}
              onValueChange={(v: SortOption) => setSortOrder(v)}>
              <SelectTrigger aria-label='Sort articles'>
                <SelectValue placeholder='Sort order' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='default'>Default Order</SelectItem>
                <SelectItem value='views_desc'>Most Views</SelectItem>
                <SelectItem value='views_asc'>Fewest Views</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Active filter chips */}
          {hasActiveFilters && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex flex-wrap gap-2 items-center pt-1'>
              <button
                onClick={clearFilters}
                className='text-xs text-destructive hover:text-destructive/80 flex items-center gap-1 font-medium'>
                <X className='w-3 h-3' /> Clear all
              </button>
              {titleSearch && (
                <span className='inline-flex items-center gap-1.5 text-xs bg-muted border border-border rounded-full px-3 py-1'>
                  Search: {titleSearch}
                  <button
                    onClick={() => setTitleSearch("")}
                    aria-label='Remove title filter'>
                    <X className='h-3 w-3' />
                  </button>
                </span>
              )}
              {selectedAuthor && (
                <span className='inline-flex items-center gap-1.5 text-xs bg-muted border border-border rounded-full px-3 py-1'>
                  Author: {selectedAuthor}
                  <button
                    onClick={() => setSelectedAuthor(undefined)}
                    aria-label='Remove author filter'>
                    <X className='h-3 w-3' />
                  </button>
                </span>
              )}
              {sortOrder !== "default" && (
                <span className='inline-flex items-center gap-1.5 text-xs bg-muted border border-border rounded-full px-3 py-1'>
                  Sort:{" "}
                  {sortOrder === "views_desc" ? "Most Views" : "Fewest Views"}
                  <button
                    onClick={() => setSortOrder("default")}
                    aria-label='Remove sort filter'>
                    <X className='h-3 w-3' />
                  </button>
                </span>
              )}
            </motion.div>
          )}
        </div>

        {/* ── News Grid ────────────────────────────────────────────────── */}
        {newsList === undefined ? (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className='rounded-2xl border border-border overflow-hidden'>
                <Skeleton className='aspect-[1.91/1] w-full' />
                <div className='p-4 space-y-2'>
                  <Skeleton className='h-4 w-full rounded-lg' />
                  <Skeleton className='h-4 w-4/5 rounded-lg' />
                  <div className='flex justify-between pt-2'>
                    <Skeleton className='h-3 w-20 rounded-full' />
                    <Skeleton className='h-3 w-16 rounded-full' />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : paginatedNews.length === 0 ? (
          <div className='flex flex-col items-center justify-center py-24 text-center gap-3'>
            <div className='w-16 h-16 rounded-2xl bg-muted flex items-center justify-center'>
              <Newspaper className='w-8 h-8 text-muted-foreground/40' />
            </div>
            <p className='text-lg font-semibold text-foreground'>
              No articles found
            </p>
            <p className='text-sm text-muted-foreground'>
              {hasActiveFilters
                ? "Try adjusting your filters."
                : "Check back later for updates."}
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className='mt-1 text-sm text-primary hover:underline font-semibold'>
                Clear all filters
              </button>
            )}
          </div>
        ) : (
          <section aria-label='News articles'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
              <AnimatePresence mode='wait'>
                {paginatedNews.map((news, index) => (
                  <motion.article
                    key={news._id}
                    initial={
                      shouldReduceMotion
                        ? false
                        : { opacity: 0, y: 24, scale: 0.98 }
                    }
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{
                      delay: index * 0.06,
                      type: "spring",
                      stiffness: 140,
                      damping: 20,
                    }}
                    className='group flex flex-col rounded-2xl border border-border bg-card overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300'>
                    {/* Cover image */}
                    <div className='relative aspect-[1.91/1] overflow-hidden bg-muted flex-shrink-0'>
                      {news.coverImage ? (
                        <Image
                          src={news.coverImage}
                          alt={news.title}
                          fill
                          className='object-cover object-top transition-transform duration-500 group-hover:scale-105'
                          sizes='(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                          priority={index < 3}
                        />
                      ) : (
                        <div
                          className='absolute inset-0 bg-gradient-to-br from-primary/10 to-muted/30 flex items-center justify-center'
                          aria-hidden='true'>
                          <CameraOff className='w-8 h-8 text-muted-foreground/40' />
                        </div>
                      )}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent' />

                      {/* Multi-image badge */}
                      {news.images && news.images.length > 1 && (
                        <div className='absolute top-3 right-3 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium px-2 py-1 rounded-full'>
                          <Images className='w-3 h-3' />
                          {news.images.length}
                        </div>
                      )}

                      {/* Overlay meta */}
                      <div className='absolute bottom-0 left-0 right-0 p-4'>
                        <p className='text-white/90 text-xs font-medium truncate'>
                          {news.author}
                        </p>
                        <div className='flex items-center justify-between mt-0.5'>
                          <time
                            className='text-white/70 text-xs'
                            dateTime={dayjs(news._creationTime).format(
                              "YYYY-MM-DD"
                            )}>
                            {dayjs(news._creationTime).format("MMM DD, YYYY")}
                          </time>
                          <span className='flex items-center gap-1 text-white/70 text-xs'>
                            <Eye className='w-3 h-3' />
                            {news.views.toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Body */}
                    <div className='flex flex-col flex-1 p-4'>
                      <h2 className='font-semibold text-foreground text-sm leading-snug line-clamp-2 mb-3'>
                        {news.title}
                      </h2>
                      {news.updatedOn && (
                        <p className='text-xs text-muted-foreground mb-3'>
                          Updated{" "}
                          {dayjs(news.updatedOn).format("MMM DD, YYYY")}
                        </p>
                      )}
                      <div className='mt-auto pt-3 flex items-center justify-between border-t border-border/50'>
                        <Link
                          href={`/news/${news.slug}`}
                          className='text-xs font-semibold text-primary hover:underline flex items-center gap-1.5'
                          aria-label={`Read more about ${news.title}`}>
                          Read More
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='12'
                            height='12'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2.5'
                            className='group-hover:translate-x-0.5 transition-transform'
                            aria-hidden='true'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                            />
                          </svg>
                        </Link>
                        <button
                          onClick={() => handleShare(news.slug, news.title)}
                          className='flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors'
                          aria-label='Share article'>
                          <Share2 className='w-3.5 h-3.5' />
                          Share
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </section>
        )}

        {/* ── Pagination ───────────────────────────────────────────────── */}
        {totalPages > 1 && (
          <motion.nav
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-12'
            aria-label='Pagination'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage((p) => p - 1);
                    }}
                    aria-disabled={currentPage === 1}
                    className={
                      currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
                    }
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className='px-4 h-10 flex items-center text-sm font-medium text-muted-foreground'>
                    Page {currentPage} of {totalPages}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages)
                        setCurrentPage((p) => p + 1);
                    }}
                    aria-disabled={currentPage === totalPages}
                    className={
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.nav>
        )}
      </section>
    </div>
  );
}
