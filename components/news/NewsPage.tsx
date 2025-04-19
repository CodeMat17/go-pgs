"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";
import dayjs from "dayjs";
import { motion, useReducedMotion } from "framer-motion";
import { CameraOff, Minus, Share2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SortOption = "default" | "views_asc" | "views_desc";
const ITEMS_PER_PAGE = 12;

export default function NewsPage() {
  const newsList = useQuery(api.news.getNewsList);
  const shouldReduceMotion = useReducedMotion();
  const [titleSearch, setTitleSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>();
  const [sortOrder, setSortOrder] = useState<SortOption>("default");
  const [currentPage, setCurrentPage] = useState(1);

  // Memoized filtered news
  const { uniqueAuthors, totalPages, paginatedNews } = useMemo(() => {
    if (!newsList)
      return { uniqueAuthors: [], totalPages: 0, paginatedNews: [] };

    const authors = Array.from(new Set(newsList.map((item) => item.author)));

    const filtered = newsList
      .filter((item) => {
        const matchesTitle = item.title
          .toLowerCase()
          .includes(titleSearch.toLowerCase());
        const matchesAuthor = !selectedAuthor || item.author === selectedAuthor;
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

  // Share functionality
  const handleShare = async (slug: string) => {
    const url = `${window.location.origin}/news/${slug}`;
    try {
      if (navigator.share) {
        await navigator.share({ url });
      } else {
        await navigator.clipboard.writeText(url);
        // Replace with toast implementation
        alert("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Sharing failed:", error);
    }
  };

  if (newsList === undefined) {
    return (
      <div
        className='w-full min-h-96 flex items-center justify-center'
        aria-live='polite'>
        <Minus className='animate-spin mr-3' aria-hidden='true' />
        <span>Loading news articles...</span>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen px-4 py-12 bg-gray-100 dark:bg-gray-950'>
      <div className='max-w-5xl mx-auto'>
        <motion.h1
          initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-3xl sm:text-4xl font-bold mb-12 text-center'>
          Latest Updates
        </motion.h1>

        {/* Filter Controls */}
        <section aria-label='News filters' className='space-y-8 mb-12'>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-4'>
            {/* Title Search */}
            <div className='space-y-1'>
              <label
                htmlFor='search'
                className='text-sm font-medium text-foreground/80'>
                Search by Title
              </label>
              <div className='relative'>
                <Input
                  id='search'
                  placeholder='Type to search...'
                  value={titleSearch}
                  onChange={(e) => setTitleSearch(e.target.value)}
                  className='bg-background pr-10 py-5'
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
            </div>

            {/* Author Filter */}
            <div className='space-y-1'>
              <label
                htmlFor='author'
                className='text-sm font-medium text-foreground/80'>
                Filter by Author
              </label>
              <Select
                value={selectedAuthor}
                onValueChange={(value: string) =>
                  setSelectedAuthor(value === "all" ? undefined : value)
                }>
                <SelectTrigger id='author' className='bg-background py-5'>
                  <SelectValue placeholder='All authors' />
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
            </div>

            {/* View Sorting */}
            <div className='space-y-1'>
              <label
                htmlFor='sort'
                className='text-sm font-medium text-foreground/80'>
                Sort by Views
              </label>
              <Select
                value={sortOrder}
                onValueChange={(value: SortOption) => setSortOrder(value)}>
                <SelectTrigger id='sort' className='bg-background py-5'>
                  <SelectValue placeholder='Sort order' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='default'>Default Order</SelectItem>
                  <SelectItem value='views_desc'>Most Views</SelectItem>
                  <SelectItem value='views_asc'>Fewest Views</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(titleSearch || selectedAuthor || sortOrder !== "default") && (
            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex flex-wrap gap-2 items-center'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  setTitleSearch("");
                  setSelectedAuthor(undefined);
                  setSortOrder("default");
                }}
                className='text-destructive hover:text-destructive/80'>
                <X className='mr-2 h-4 w-4' />
                Clear All Filters
              </Button>

              {titleSearch && (
                <Badge variant='outline' className='px-3 py-1'>
                  Title: {titleSearch}
                  <button
                    onClick={() => setTitleSearch("")}
                    className='ml-2'
                    aria-label='Remove title filter'>
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              )}

              {selectedAuthor && (
                <Badge variant='outline' className='px-3 py-1'>
                  Author: {selectedAuthor}
                  <button
                    onClick={() => setSelectedAuthor(undefined)}
                    className='ml-2'
                    aria-label='Remove author filter'>
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              )}

              {sortOrder !== "default" && (
                <Badge variant='outline' className='px-3 py-1'>
                  Sort:{" "}
                  {sortOrder === "views_desc" ? "Most Views" : "Fewest Views"}
                  <button
                    onClick={() => setSortOrder("default")}
                    className='ml-2'
                    aria-label='Remove sort filter'>
                    <X className='h-3 w-3' />
                  </button>
                </Badge>
              )}
            </motion.div>
          )}
        </section>

        {/* News Grid */}
        <section aria-label='News articles list'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6'>
            {paginatedNews.length > 0 ? (
              paginatedNews.map((news, index) => (
                <motion.article
                  key={news._id}
                  initial={
                    shouldReduceMotion
                      ? false
                      : { opacity: 0, y: 50, scale: 0.98 }
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 120,
                  }}
                  className='relative'>
                  <Card className='group h-full flex flex-col overflow-hidden shadow-md hover:shadow-lg dark:bg-gray-900'>
                    {/* Image Section */}
                    <div className='relative aspect-[1.91/1] overflow-hidden'>
                      {news.coverImage ? (
                        <Image
                          src={news.coverImage}
                          alt={news.title}
                          fill
                          className='object-cover transition-transform duration-500 group-hover:scale-105'
                          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                          priority={index < 3}
                        />
                      ) : (
                        <div
                          className='absolute inset-0 bg-gradient-to-br from-primary/10 to-muted/30 flex items-center justify-center'
                          aria-hidden='true'>
                          <CameraOff className='w-8 h-8 text-muted-foreground/50' />
                        </div>
                      )}
                      <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent' />

                      {/* Article Meta */}
                      <div className='absolute bottom-4 left-4 right-4 text-white'>
                        <p className='text-sm font-medium'>{news.author}</p>
                        <div className='flex justify-between items-center'>
                          <time
                            className='text-xs text-primary-100/90'
                            dateTime={dayjs(news._creationTime).format(
                              "YYYY-MM-DD"
                            )}>
                            {dayjs(news._creationTime).format("MMM DD, YYYY")}
                          </time>
                          <Badge
                            variant='secondary'
                            className='py-1 px-2 text-xs bg-black/30 backdrop-blur-sm'>
                            {news.views.toLocaleString()} views
                          </Badge>
                        </div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className='flex-1 flex flex-col p-4 space-y-3'>
                      <h2 className='font-semibold line-clamp-2 leading-snug'>
                        {news.title}
                      </h2>

                      {news.updatedOn && (
                        <div className='text-sm text-muted-foreground'>
                          <time
                            dateTime={dayjs(news.updatedOn).format(
                              "YYYY-MM-DD"
                            )}>
                            Updated{" "}
                            {dayjs(news.updatedOn).format("MMM DD, YYYY")}
                          </time>
                        </div>
                      )}

                      {/* Action Bar */}
                      <div className='mt-auto pt-3 flex items-center justify-between border-t border-muted/20'>
                        <Button
                          asChild
                          variant='ghost'
                          size='sm'
                          className='rounded-full px-4 hover:bg-primary/10'>
                          <Link
                            href={`/news/${news.slug}`}
                            className='flex items-center gap-2 text-primary'
                            aria-label={`Read more about ${news.title}`}>
                            Read More
                            <svg
                              xmlns='http://www.w3.org/2000/svg'
                              width='16'
                              height='16'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                              className='opacity-80 group-hover:translate-x-1 transition-transform'>
                              <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                              />
                            </svg>
                          </Link>
                        </Button>

                        <Button
                          variant='ghost'
                          size='sm'
                          className='rounded-full hover:bg-muted/30'
                          onClick={() => handleShare(news.slug)}
                          aria-label='Share article'>
                          <Share2 className='w-4 h-4' /> Share
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.article>
              ))
            ) : (
              <div className='col-span-full text-center py-12'>
                <p className='text-muted-foreground'>No articles found</p>
              </div>
            )}
          </div>
        </section>

        {/* Pagination */}
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
                  <span className='px-4 h-10 text-sm font-medium'>
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
      </div>
    </div>
  );
}
