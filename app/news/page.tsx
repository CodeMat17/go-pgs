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
import { motion } from "framer-motion";
import { CameraOff, Minus, Share2, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

type SortOption = "default" | "views_asc" | "views_desc";
const ITEMS_PER_PAGE = 12;

export default function NewsPage() {
  const newsList = useQuery(api.news.getNewsList);
  const [titleSearch, setTitleSearch] = useState("");
  const [selectedAuthor, setSelectedAuthor] = useState<string>();
  const [sortOrder, setSortOrder] = useState<SortOption>("default");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const { uniqueAuthors, totalPages, paginatedNews } = useMemo(() => {
    if (!newsList)
      return {
        uniqueAuthors: [],
        uniqueTags: [],
        totalPages: 0,
        paginatedNews: [],
      };

    const authors = Array.from(new Set(newsList.map((item) => item.author)));

    let filtered = newsList.filter((item) => {
      const matchesTitle = item.title 
        .toLowerCase()
        .includes(titleSearch.toLowerCase());
      const matchesAuthor = !selectedAuthor || item.author === selectedAuthor;

      return matchesTitle && matchesAuthor;
    });

    filtered = [...filtered].sort((a, b) => {
      if (sortOrder === "views_asc") return a.views - b.views;
      if (sortOrder === "views_desc") return b.views - a.views;
      return 0;
    });

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedNews = filtered.slice(startIndex, endIndex);

    return {
      filteredNews: filtered,
      uniqueAuthors: authors,
      totalPages,
      paginatedNews,
    };
  }, [newsList, titleSearch, selectedAuthor, sortOrder, currentPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [titleSearch, selectedAuthor, sortOrder, selectedTags]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && currentPage > 1) {
        setCurrentPage((p) => p - 1);
      } else if (e.key === "ArrowRight" && currentPage < totalPages) {
        setCurrentPage((p) => p + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentPage, totalPages]);

  const handleShare = (slug: string) => {
    const url = `${window.location.origin}/news/${slug}`;
    navigator.clipboard.writeText(url);
  };

  if (newsList === undefined) {
    return (
      <div className='w-full min-h-96 flex items-center justify-center'>
        <Minus className='animate-spin mr-3' /> News list Loading...
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen px-4 py-12 bg-gray-50 dark:bg-gray-950'>
      <div className='max-w-5xl mx-auto'>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-3xl sm:text-4xl font-bold mb-12 text-center'>
          Latest Updates
        </motion.h1>

        {/* Filter Controls */}
        <div className='space-y-8 mb-12'>
          <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-2 md:gap-4'>
            {/* Title Search */}
            <div className='space-y-0.5'>
              <label className='text-sm font-medium text-foreground/80'>
                Search by Title
              </label>
              <div className='relative'>
                <Input
                  placeholder='Type to search...'
                  value={titleSearch}
                  onChange={(e) => setTitleSearch(e.target.value)}
                  className='bg-background pr-10'
                />
                {titleSearch && (
                  <button
                    onClick={() => setTitleSearch("")}
                    className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors'
                    aria-label='Clear search'>
                    <X className='h-4 w-4' />
                  </button>
                )}
              </div>
            </div>

            {/* Author Filter */}
            <div className='space-y-0.5'>
              <label className='text-sm font-medium text-foreground/80'>
                Filter by Author
              </label>
              <Select
                value={selectedAuthor}
                onValueChange={(value: string) =>
                  setSelectedAuthor(value === "all" ? undefined : value)
                }>
                <SelectTrigger className='bg-background'>
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
            <div className='space-y-0.5'>
              <label className='text-sm font-medium text-foreground/80'>
                Sort by Views
              </label>
              <Select
                value={sortOrder}
                onValueChange={(value: SortOption) => setSortOrder(value)}>
                <SelectTrigger className='bg-background'>
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
          {(titleSearch ||
            selectedAuthor ||
            selectedTags.length > 0 ||
            sortOrder !== "default") && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className='flex flex-wrap gap-2 items-center'>
              <Button
                variant='ghost'
                size='sm'
                onClick={() => {
                  setTitleSearch("");
                  setSelectedAuthor(undefined);
                  setSelectedTags([]);
                  setSortOrder("default");
                }}
                className='text-destructive hover:text-destructive/80'>
                <X className='mr-2 h-4 w-4' />
                Clear All Filters
              </Button>

              {titleSearch && (
                <Badge variant='outline' className='px-3 py-1'>
                  Title: {titleSearch}
                  <X
                    className='ml-2 h-3 w-3 cursor-pointer'
                    onClick={() => setTitleSearch("")}
                  />
                </Badge>
              )}

              {selectedAuthor && (
                <Badge variant='outline' className='px-3 py-1'>
                  Author: {selectedAuthor}
                  <X
                    className='ml-2 h-3 w-3 cursor-pointer'
                    onClick={() => setSelectedAuthor(undefined)}
                  />
                </Badge>
              )}

              {selectedTags.map((tag) => (
                <Badge key={tag} variant='outline' className='px-3 py-1'>
                  {tag}
                  <X
                    className='ml-2 h-3 w-3 cursor-pointer'
                    onClick={() =>
                      setSelectedTags(selectedTags.filter((t) => t !== tag))
                    }
                  />
                </Badge>
              ))}

              {sortOrder !== "default" && (
                <Badge variant='outline' className='px-3 py-1'>
                  Sort:{" "}
                  {sortOrder === "views_desc" ? "Most Views" : "Fewest Views"}
                  <X
                    className='ml-2 h-3 w-3 cursor-pointer'
                    onClick={() => setSortOrder("default")}
                  />
                </Badge>
              )}
            </motion.div>
          )}
        </div>

        {/* News Grid */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
          {paginatedNews.length > 0 ? (
            paginatedNews.map((news, index) => (
              <motion.div
                key={news._id}
                initial={{ opacity: 0, y: 50, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 120,
                }}
                className='relative'>
                <Card className='group h-full flex flex-col overflow-hidden transition-all duration-300 shadow-sm hover:shadow-lg hover:border-primary/30 dark:hover:border-primary/50 dark:bg-gray-900 border-transparent'>
                  {/* Image Section with Gradient Overlay */}
                  <div className='relative aspect-[1.91/1] overflow-hidden'>
                    {news.coverImage ? (
                      <Image
                        src={news.coverImage}
                        alt={news.title}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-105'
                        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                        placeholder='blur'
                        blurDataURL='data:image/png;base64,...'
                      />
                    ) : (
                      <div className='absolute inset-0 bg-gradient-to-br from-primary/10 to-muted/30 flex items-center justify-center'>
                        <CameraOff className='w-8 h-8 text-muted-foreground/50' />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent' />

                    {/* Author & Date Badge */}
                    <div className='absolute bottom-4 left-4 right-4 flex items-center justify-between'>
                      <div className='flex items-center gap-2'>
                        {/* <span className='w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center text-sm font-medium shadow-sm'>
                          {news.author[0]}
                        </span> */}
                        <div className='text-white'>
                          <p className='text-sm font-medium leading-tight'>
                            {news.author}
                          </p>
                          <p className='text-xs text-primary-100/90'>
                            {dayjs(news._creationTime).format("MMM DD, YYYY")}
                          </p>
                        </div>
                      </div>

                      <Badge
                        variant='secondary'
                        className='py-1 px-2 text-xs font-medium bg-black/30 text-white backdrop-blur-sm'>
                        {news.views.toLocaleString()} views
                      </Badge>
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className='flex-1 flex flex-col p-4 space-y-3'>
                    {/* Title with Gradient Text */}
                    <h2 className='text-xl font-bold bg-gradient-to-r from-foreground to-foreground/90 bg-clip-text text-transparent line-clamp-2 leading-snug'>
                      {news.title}
                    </h2>

                    {/* Updated Date */}
                    {news.updatedOn && (
                      <div className='flex items-center gap-2 text-sm text-muted-foreground'>
                        <span className='h-px w-4 bg-muted-foreground/30' />
                        Updated {dayjs(news.updatedOn).format("MMM DD, YYYY")}
                      </div>
                    )}

                    {/* Action Bar */}
                    <div className='mt-auto pt-3 flex items-center justify-between border-t border-muted/20'>
                      <Button
                        asChild
                        variant='ghost'
                        size='sm'
                        className='group/readmore rounded-full px-4 hover:bg-primary/10 transition-colors'>
                        <Link
                          href={`/news/${news.slug}`}
                          className='flex items-center gap-2'>
                          <span className='bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent'>
                            Read More
                          </span>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            width='16'
                            height='16'
                            viewBox='0 0 24 24'
                            fill='none'
                            stroke='currentColor'
                            strokeWidth='2'
                            className='text-primary opacity-80 group-hover/readmore:translate-x-1 transition-transform'>
                            <path
                              strokeLinecap='round'
                              strokeLinejoin='round'
                              d='M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3'
                            />
                          </svg>
                        </Link>
                      </Button>

                      <div className='flex items-center gap-2'>
                      
                        <Button
                          variant='ghost'
                          size='icon'
                          className='rounded-full hover:bg-muted/30'
                          onClick={() => handleShare(news.slug)}
                          aria-label='Share article'>
                          <Share2 className='w-4 h-4 text-muted-foreground' />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))
          ) : (
            <div className='col-span-full text-center py-12'>
              <p className='text-muted-foreground'>
                No articles found matching your criteria
              </p>
            </div>
          )}
        </div>

        {/* Shadcn Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='mt-12'>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }
                    }}
                    className={
                      currentPage === 1
                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                        : ""
                    }
                  />
                </PaginationItem>

                <PaginationItem>
                  <div className='flex items-center px-4 h-10 text-sm font-medium'>
                    Page {currentPage} of {totalPages}
                  </div>
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    href='#'
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) {
                        setCurrentPage(currentPage + 1);
                      }
                    }}
                    className={
                      currentPage === totalPages
                        ? "opacity-50 cursor-not-allowed pointer-events-none"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.div>
        )}
      </div>
    </div>
  );
}
