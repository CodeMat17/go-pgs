// Server-side reads of Convex data, cached so pages can be statically
// generated and revalidated (ISR) instead of rendered on every request.
// Client components still subscribe with useQuery for live updates; these
// values seed the first render so content is in the HTML for crawlers and LCP.
import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";
import { unstable_cache } from "next/cache";
import sanitizeHtml from "sanitize-html";

export const REVALIDATE_SECONDS = 60;

const cached = <A extends unknown[], R>(
  fn: (...args: A) => Promise<R>,
  key: string
) => unstable_cache(fn, [key], { revalidate: REVALIDATE_SECONDS });

export const getNewsList = cached(
  () => fetchQuery(api.news.getNewsList, {}),
  "news-list"
);

export const getNewsBySlug = cached(
  (slug: string) => fetchQuery(api.news.getNewsBySlug, { slug }),
  "news-by-slug"
);

export const getCourseBySlug = cached(
  (slug: string) => fetchQuery(api.courses.getProgramBySlug, { slug }),
  "course-by-slug"
);

export const getHowToApply = cached(
  () => fetchQuery(api.howToApply.getAll, {}),
  "how-to-apply"
);

export const getAllCourses = cached(
  () => fetchQuery(api.courses.getAllCourses, {}),
  "all-courses"
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
  "mission"
);

export const getVision = cached(
  () => fetchQuery(api.vision.getVision, {}),
  "vision"
);

export const getFaculties = cached(
  () => fetchQuery(api.faculties.getFaculties, {}),
  "faculties"
);
