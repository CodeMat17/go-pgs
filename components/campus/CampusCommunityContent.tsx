"use client";

import { SafeHTMLRenderer } from "@/components/SafeHTMLRenderer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Eye,
  GraduationCap,
  Newspaper,
  Search,
  Star,
  Tag,
  Trophy,
  Users,
  X,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useRef, useState } from "react";

// ── helpers ───────────────────────────────────────────────────────────────────

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

const CATEGORY_COLOURS: Record<string, string> = {
  research: "bg-blue-500/15 text-blue-600 dark:text-blue-400",
  opinion: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  experience: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  academic: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  story: "bg-rose-500/15 text-rose-600 dark:text-rose-400",
};

function catColour(cat?: string) {
  if (!cat) return "bg-muted text-muted-foreground";
  const key = cat.toLowerCase();
  return CATEGORY_COLOURS[key] ?? "bg-primary/10 text-primary";
}

// ── Skeletons ─────────────────────────────────────────────────────────────────

function Pulse({ className }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-muted ${className}`} />;
}

function SpotlightSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl overflow-hidden border border-border">
          <Pulse className="aspect-[4/5] rounded-none" />
          <div className="p-4 space-y-2">
            <Pulse className="h-4 w-2/3" />
            <Pulse className="h-3 w-1/2" />
            <Pulse className="h-3 w-full mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function PenSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-6 space-y-3">
          <Pulse className="h-5 w-16 rounded-full" />
          <Pulse className="h-5 w-full" />
          <Pulse className="h-4 w-5/6" />
          <Pulse className="h-3 w-full" />
          <Pulse className="h-3 w-4/5" />
          <div className="flex gap-2 pt-1">
            <Pulse className="h-3 w-20" />
            <Pulse className="h-3 w-14" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ── Spotlight Sheet content ───────────────────────────────────────────────────

function SpotlightSheetBody({
  spotlight,
}: {
  spotlight: Doc<"postgradSpotlight">;
}) {
  const [photoIdx, setPhotoIdx] = useState(0);
  const photos = spotlight.photos ?? [];
  const current = photos[photoIdx];

  return (
    <div className="flex flex-col h-full overflow-y-auto">
      {/* Photo */}
      {current ? (
        <div className="relative w-full aspect-[4/3] bg-muted shrink-0 overflow-hidden">
          <Image
            src={current.url}
            alt={spotlight.name}
            fill
            className="object-cover object-top"
            sizes="480px"
          />
          {photos.length > 1 && (
            <>
              <button
                onClick={() => setPhotoIdx((i) => Math.max(0, i - 1))}
                disabled={photoIdx === 0}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setPhotoIdx((i) => Math.min(photos.length - 1, i + 1))}
                disabled={photoIdx === photos.length - 1}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center rounded-full bg-black/50 text-white hover:bg-black/70 disabled:opacity-30 transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {photos.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPhotoIdx(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === photoIdx ? "bg-white scale-125" : "bg-white/50"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="w-full aspect-[4/3] bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center shrink-0">
          <span className="text-5xl font-extrabold text-primary/30">
            {getInitials(spotlight.name)}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-6 space-y-4 flex-1">
        <SheetHeader>
          <SheetTitle className="text-xl font-bold leading-snug">
            {spotlight.name}
          </SheetTitle>
          <SheetDescription asChild>
            <div className="flex flex-wrap gap-2 mt-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                <GraduationCap className="w-3 h-3" />
                {spotlight.program}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                {spotlight.faculty}
              </span>
            </div>
          </SheetDescription>
        </SheetHeader>

        {spotlight.achievement && (
          <div className="flex items-start gap-3 p-4 rounded-xl bg-[#FFDC55]/10 border border-[#FFDC55]/30">
            <Trophy className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
            <div className="space-y-2 flex-1">
              {spotlight.achievement.split(/\n\n+/).map((para, i) => (
                <p key={i} className="text-sm font-medium text-foreground whitespace-pre-line">
                  {para.trim()}
                </p>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          {spotlight.bio.split(/\n\n+/).map((para, i) => (
            <p key={i} className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
              {para.trim()}
            </p>
          ))}
        </div>

        {photos.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1 pt-1">
            {photos.map((photo, i) => (
              <button
                key={i}
                onClick={() => setPhotoIdx(i)}
                className={`relative w-16 h-16 shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                  i === photoIdx
                    ? "border-primary"
                    : "border-transparent opacity-60"
                }`}
              >
                <Image
                  src={photo.url}
                  alt=""
                  fill
                  className="object-cover object-top"
                  sizes="64px"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Pen modal ─────────────────────────────────────────────────────────────────

function PenModal({
  article,
  onClose,
}: {
  article: Doc<"postgradPen">;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/70 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 60 }}
        transition={{ type: "spring", damping: 28, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full sm:max-w-2xl max-h-[92vh] overflow-y-auto bg-card rounded-t-3xl sm:rounded-2xl shadow-2xl"
      >
        {/* Mobile drag handle */}
        <div className="sticky top-0 z-10 flex justify-center pt-3 pb-1 bg-card sm:hidden">
          <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
        </div>

        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-muted transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="p-6 pt-4 space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {article.category && (
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${catColour(article.category)}`}
              >
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            )}
            <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
              <Eye className="w-3 h-3" />
              {(article.views ?? 0).toLocaleString()} views
            </span>
          </div>

          <h2 className="text-2xl font-bold text-foreground leading-snug">
            {article.title}
          </h2>

          <div className="flex items-center gap-2 pb-2 border-b border-border">
            <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center">
              <span className="text-xs font-bold text-primary">
                {getInitials(article.author)}
              </span>
            </div>
            <span className="text-sm font-medium text-foreground">
              {article.author}
            </span>
          </div>

          <SafeHTMLRenderer
            htmlContent={article.content}
            className="text-foreground prose-sm sm:prose dark:prose-invert max-w-none"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Spotlight card ────────────────────────────────────────────────────────────

function SpotlightCard({
  spotlight,
  delay,
  shouldReduceMotion,
  onClick,
}: {
  spotlight: Doc<"postgradSpotlight">;
  delay: number;
  shouldReduceMotion: boolean | null;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const photo = spotlight.photos?.[0];

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <button
        onClick={onClick}
        className="group w-full text-left rounded-2xl overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative aspect-[4/5] bg-muted overflow-hidden">
          {photo ? (
            <Image
              src={photo.url}
              alt={spotlight.name}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 320px"
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
              <span className="text-4xl font-extrabold text-primary/30">
                {getInitials(spotlight.name)}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {spotlight.achievement && (
            <div className="absolute top-3 left-3">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-1 rounded-full bg-[#FFDC55]/90 text-gray-900 backdrop-blur-sm">
                <Star className="w-3 h-3" />
                Achievement
              </span>
            </div>
          )}

          {spotlight.photos.length > 1 && (
            <div className="absolute top-3 right-3">
              <span className="text-[10px] font-bold px-2 py-1 rounded-full bg-black/50 text-white backdrop-blur-sm">
                +{spotlight.photos.length - 1} photos
              </span>
            </div>
          )}

          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="font-bold text-white text-base leading-snug drop-shadow">
              {spotlight.name}
            </p>
            <p className="text-white/70 text-xs mt-0.5">{spotlight.program}</p>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
            <GraduationCap className="w-3 h-3" />
            {spotlight.faculty}
          </span>
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {spotlight.bio}
          </p>
          <p className="text-xs font-semibold text-primary mt-1">
            View full profile →
          </p>
        </div>
      </button>
    </motion.div>
  );
}

// ── Pen card ──────────────────────────────────────────────────────────────────

function PenCard({
  article,
  delay,
  shouldReduceMotion,
  onClick,
}: {
  article: Doc<"postgradPen">;
  delay: number;
  shouldReduceMotion: boolean | null;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const preview = stripHtml(article.content).slice(0, 160);

  return (
    <motion.div
      ref={ref}
      initial={shouldReduceMotion ? false : { opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay }}
    >
      <button
        onClick={onClick}
        className="group w-full text-left h-full flex flex-col rounded-2xl border border-border bg-card p-6 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${catColour(article.category)}`}
          >
            <Tag className="w-3 h-3" />
            {article.category ?? "General"}
          </span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Eye className="w-3 h-3" />
            {(article.views ?? 0).toLocaleString()}
          </span>
        </div>

        <h3 className="font-bold text-base text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-primary transition-colors">
          {article.title}
        </h3>

        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 flex-1">
          {preview}
          {preview.length === 160 && "…"}
        </p>

        <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-primary">
                {getInitials(article.author)}
              </span>
            </div>
            <span className="text-xs font-medium text-muted-foreground truncate max-w-[120px]">
              {article.author}
            </span>
          </div>
          <span className="text-xs font-semibold text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            Read →
          </span>
        </div>
      </button>
    </motion.div>
  );
}

// ── Section header ────────────────────────────────────────────────────────────

function SectionHeader({
  icon,
  iconBg,
  eyebrow,
  title,
  description,
  shouldReduceMotion,
}: {
  icon: React.ReactNode;
  iconBg: string;
  eyebrow: string;
  title: string;
  description: string;
  shouldReduceMotion: boolean | null;
}) {
  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="mb-8"
    >
      <div className="flex items-center gap-2 mb-2">
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-2xl sm:text-3xl font-bold text-foreground">{title}</h2>
      <p className="mt-1 text-muted-foreground text-sm sm:text-base max-w-md">
        {description}
      </p>
    </motion.div>
  );
}

// ── Empty state ───────────────────────────────────────────────────────────────

function EmptyState({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-14 h-14 rounded-2xl bg-muted flex items-center justify-center mb-4">
        {icon}
      </div>
      <p className="font-semibold text-foreground">{title}</p>
      <p className="text-sm text-muted-foreground mt-1">{description}</p>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function CampusCommunityContent() {
  const shouldReduceMotion = useReducedMotion();
  const penList = useQuery(api.postgradPen.getPostgradPenList);
  const spotlights = useQuery(api.postgradPen.getSpotlights);
  const incrementViews = useMutation(api.postgradPen.incrementPenViews);

  const [activeSpotlight, setActiveSpotlight] = useState<Doc<"postgradSpotlight"> | null>(null);
  const [activePen, setActivePen] = useState<Doc<"postgradPen"> | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 20;

  const filteredPen = (penList ?? []).filter((a) => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      a.title.toLowerCase().includes(q) ||
      a.author.toLowerCase().includes(q) ||
      (a.category ?? "").toLowerCase().includes(q) ||
      stripHtml(a.content).toLowerCase().includes(q)
    );
  });

  const totalPages = Math.max(1, Math.ceil(filteredPen.length / PAGE_SIZE));
  const pagedPen = filteredPen.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const openPen = useCallback(
    (article: Doc<"postgradPen">) => {
      setActivePen(article);
      incrementViews({ slug: article.slug }).catch(() => null);
    },
    [incrementViews]
  );

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const isPenLoading = penList === undefined;
  const isSpotlightLoading = spotlights === undefined;

  return (
    <div className="min-h-screen bg-background">

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-primary text-primary-foreground">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "url('/pattern.png')", backgroundSize: "400px" }}
          aria-hidden="true"
        />
        <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />
        <div className="pointer-events-none absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-white/10 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:py-28 text-center">
          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-medium backdrop-blur-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-[#FFDC55]" aria-hidden="true" />
            Student Life at GOUNI SPGS
          </motion.div>

          <motion.h1
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight"
          >
            Campus Community
          </motion.h1>

          <motion.p
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 max-w-2xl mx-auto text-primary-foreground/80 text-lg"
          >
            Celebrating the brilliant minds, voices, and stories that define
            postgraduate life at Godfrey Okoye University.
          </motion.p>

          <motion.div
            initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="mt-8 flex flex-wrap justify-center gap-4"
          >
            {[
              { icon: Users, label: "Student Spotlights", value: spotlights?.length ?? "–" },
              { icon: BookOpen, label: "Pen Articles", value: penList?.length ?? "–" },
            ].map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sm"
              >
                <Icon className="w-4 h-4" />
                <span className="font-bold">{value}</span>
                <span className="text-primary-foreground/70">{label}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Main body: side-by-side on lg+, stacked on mobile ── */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
        <div className="flex flex-col lg:flex-row lg:gap-12 lg:items-start">

          {/* ── LEFT (lg+): Postgrad Pen — shown BELOW spotlight on mobile ── */}
          <div className="lg:flex-[2] min-w-0 order-2 lg:order-1 mt-16 lg:mt-0">
            <SectionHeader
              icon={<Newspaper className="w-4 h-4 text-primary" />}
              iconBg="bg-primary/10"
              eyebrow="Student Writing"
              title="The Postgrad Pen"
              description="Original articles, opinions, and research stories written by our postgraduate community."
              shouldReduceMotion={shouldReduceMotion}
            />

            {/* Search input */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search articles, authors, categories…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
              {searchQuery && (
                <button
                  onClick={() => handleSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {isPenLoading ? (
              <PenSkeleton />
            ) : !penList?.length ? (
              <EmptyState
                icon={<BookOpen className="w-7 h-7 text-muted-foreground" />}
                title="No articles yet"
                description="Student articles will appear here once published."
              />
            ) : pagedPen.length === 0 ? (
              <EmptyState
                icon={<Search className="w-7 h-7 text-muted-foreground" />}
                title="No results found"
                description={`No articles match "${searchQuery}". Try a different keyword.`}
              />
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {pagedPen.map((article, i) => (
                    <PenCard
                      key={article._id}
                      article={article}
                      delay={i * 0.04}
                      shouldReduceMotion={shouldReduceMotion}
                      onClick={() => openPen(article)}
                    />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                      disabled={currentPage === 1}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      <ChevronLeft className="w-4 h-4" /> Prev
                    </button>

                    <span className="text-sm text-muted-foreground">
                      Page <span className="font-semibold text-foreground">{currentPage}</span> of{" "}
                      <span className="font-semibold text-foreground">{totalPages}</span>
                      <span className="hidden sm:inline">
                        {" "}· {filteredPen.length} article{filteredPen.length !== 1 ? "s" : ""}
                      </span>
                    </span>

                    <button
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                      disabled={currentPage === totalPages}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-border bg-card text-sm font-medium text-foreground hover:bg-muted disabled:opacity-40 disabled:cursor-not-allowed transition"
                    >
                      Next <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* ── RIGHT (lg+): Spotlight — shown FIRST on mobile ── */}
          <div className="lg:flex-[1] min-w-0 order-1 lg:order-2 lg:sticky lg:top-24">
            <SectionHeader
              icon={<Star className="w-4 h-4 text-amber-500" />}
              iconBg="bg-[#FFDC55]/15"
              eyebrow="Featured"
              title="Student Spotlight"
              description="Meet the exceptional students making a mark in research, community, and innovation."
              shouldReduceMotion={shouldReduceMotion}
            />

            {isSpotlightLoading ? (
              <SpotlightSkeleton />
            ) : !spotlights?.length ? (
              <EmptyState
                icon={<Users className="w-7 h-7 text-muted-foreground" />}
                title="No spotlights yet"
                description="Student spotlights will appear here once added."
              />
            ) : (
              <div className="grid grid-cols-1 gap-5">
                {spotlights.map((s, i) => (
                  <SpotlightCard
                    key={s._id}
                    spotlight={s}
                    delay={i * 0.08}
                    shouldReduceMotion={shouldReduceMotion}
                    onClick={() => setActiveSpotlight(s)}
                  />
                ))}
              </div>
            )}
          </div>

        </div>
      </div>

      {/* ── Spotlight Sheet ── */}
      <Sheet
        open={activeSpotlight !== null}
        onOpenChange={(open) => { if (!open) setActiveSpotlight(null); }}
      >
        <SheetContent
          side="right"
          className="w-full sm:max-w-md p-0 overflow-y-auto"
        >
          {activeSpotlight && (
            <SpotlightSheetBody spotlight={activeSpotlight} />
          )}
        </SheetContent>
      </Sheet>

      {/* ── Pen modal ── */}
      <AnimatePresence>
        {activePen && (
          <PenModal
            article={activePen}
            onClose={() => setActivePen(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
