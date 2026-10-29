// Server-side reads of Convex data, cached so pages are statically generated
// and rebuilt only on demand instead of rendered on every request.
// Client components still subscribe with useQuery for live updates; these
// values seed the first render so content is in the HTML for crawlers and LCP.
//
// There is no time-based revalidation: Convex content mutations call
// /api/revalidate (see go-pgs-admin: convex/revalidate.ts) with the tags below,
// and nothing else regenerates a page short of a redeploy. Every regeneration
// costs Vercel ISR writes (data entries + HTML + RSC payloads per route), so
// tags are as narrow as the dashboard can name them: editing one article
// rebuilds that article plus the pages that list news, not every article.
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { unstable_cache } from "next/cache";
import sanitizeHtml from "sanitize-html";

export const CACHE_TAGS = [
  "news", // every news entry (list + all articles)
  "news-list",
  "courses", // every course entry (list + all detail pages)
  "courses-list",
  "faculties",
  "how-to-apply",
  "mission",
  "vision",
] as const;
type StaticTag = (typeof CACHE_TAGS)[number];

// One tag per document, so a single edit rebuilds a single detail page.
export const newsTag = (slug: string) => `news:${slug}` as const;
export const courseTag = (slug: string) => `course:${slug}` as const;
export type CacheTag =
  | StaticTag
  | ReturnType<typeof newsTag>
  | ReturnType<typeof courseTag>;

// Next caps tags at 256 chars; slugs are not guaranteed to be [a-z0-9-].
const SLUG_TAG = /^(news|course):\S{1,200}$/;
export const isCacheTag = (tag: unknown): tag is CacheTag =>
  typeof tag === "string" &&
  (CACHE_TAGS.includes(tag as StaticTag) || SLUG_TAG.test(tag));

const cached = <R>(fn: () => Promise<R>, key: string, tags: CacheTag[]) =>
  unstable_cache(fn, [key], { revalidate: false, tags });

export const getNewsList = cached(
  () => fetchQuery(api.news.getNewsList, {}),
  "news-list",
  ["news", "news-list"]
);

export const getNewsBySlug = (slug: string) =>
  cached(
    () => fetchQuery(api.news.getNewsBySlug, { slug }),
    `news-by-slug:${slug}`,
    ["news", newsTag(slug)]
  )();

export const getCourseBySlug = (slug: string) =>
  cached(
    () => fetchQuery(api.courses.getProgramBySlug, { slug }),
    `course-by-slug:${slug}`,
    ["courses", courseTag(slug)]
  )();

export const getHowToApply = cached(
  () => fetchQuery(api.howToApply.getAll, {}),
  "how-to-apply",
  ["how-to-apply"]
);

export const getAllCourses = cached(
  () => fetchQuery(api.courses.getAllCourses, {}),
  "all-courses",
  ["courses", "courses-list"]
);

/** Rich-text sanitizer for article bodies (mirrors DOMPurify's permissive default). */
export const sanitizeArticleHtml = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(["img", "h1", "h2", "u"]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      "*": ["class"],
      img: ["src", "alt", "title", "width", "height"],
    },
  });

/** Same allowlist SafeHTMLRenderer applies on the client. */
export const sanitizeBasicHtml = (html: string) =>
  sanitizeHtml(html, {
    allowedTags: ["p", "strong", "em", "u", "h1", "h2", "h3", "ul", "ol", "li", "a", "br"],
    allowedAttributes: { a: ["href", "target", "rel"] },
  });

/** Plain-text excerpt for meta descriptions. */
export const excerpt = (html: string, maxLength: number) => {
  const text = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} })
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength
    ? `${text.slice(0, maxLength - 1).trimEnd()}…`
    : text;
};

export const getMission = cached(
  () => fetchQuery(api.mission.getMission, {}),
  "mission",
  ["mission"]
);

export const getVision = cached(
  () => fetchQuery(api.vision.getVision, {}),
  "vision",
  ["vision"]
);

export const getFaculties = cached(
  () => fetchQuery(api.faculties.getFaculties, {}),
  "faculties",
  ["faculties"]
);
