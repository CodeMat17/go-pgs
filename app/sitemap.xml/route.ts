import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

const baseUrl = "https://pg.gouni.edu.ng";

// Define static routes with their priorities and change frequencies
const staticRoutes = [
  { path: "", priority: "1.0", changefreq: "daily" },
  { path: "/about-us", priority: "0.8", changefreq: "monthly" },
  { path: "/courses", priority: "0.9", changefreq: "weekly" },
  { path: "/requirements", priority: "0.8", changefreq: "monthly" },
  { path: "/research", priority: "0.8", changefreq: "weekly" },
  { path: "/news", priority: "0.9", changefreq: "daily" },
  { path: "/administrative-team", priority: "0.8", changefreq: "weekly" },
  { path: "/alumni", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.6", changefreq: "monthly" },
] as const;

// Helper function to format dates consistently
const formatDate = (date: Date | number): string => {
  return new Date(date).toISOString().split("T")[0];
};

// Helper function to create URL entries
const createUrlEntry = (
  path: string,
  lastmod: string,
  changefreq: string,
  priority: string
) => `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;

export async function GET(): Promise<Response> {
  try {
    // Fetch dynamic content in parallel
    const [courses, news] = await Promise.all([
      fetchQuery(api.courses.getAllCourses, {}),
      fetchQuery(api.news.getNewsList, {}),
    ]);

    const today = formatDate(new Date());

    // Generate static URLs
    const staticUrls = staticRoutes.map((route) =>
      createUrlEntry(route.path, today, route.changefreq, route.priority)
    );

    // Generate dynamic course URLs
    const courseUrls = (courses ?? []).map((course) =>
      createUrlEntry(
        `/courses/${course.slug}`,
        formatDate(course._creationTime),
        "weekly",
        "0.7"
      )
    );

    // Generate dynamic news URLs
    const newsUrls = (news ?? []).map((item) =>
      createUrlEntry(
        `/news/${item.slug}`,
        formatDate(item._creationTime),
        "weekly",
        "0.7"
      )
    );

    // Combine all URLs
    const allUrls = [...staticUrls, ...courseUrls, ...newsUrls].join("");

    // Build sitemap XML with proper formatting
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
  ${allUrls}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control":
          "public, max-age=3600, s-maxage=3600, stale-while-revalidate=7200",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);

    // Return a basic sitemap with static routes in case of error
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticRoutes
    .map(
      (route) =>
        `<url>
          <loc>${baseUrl}${route.path}</loc>
          <lastmod>${formatDate(new Date())}</lastmod>
          <changefreq>${route.changefreq}</changefreq>
          <priority>${route.priority}</priority>
        </url>`
    )
    .join("")}
</urlset>`;

    return new Response(fallbackSitemap, {
      status: 200, // Still return 200 with fallback content
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=600", // Shorter cache time for error state
      },
    });
  }
}
