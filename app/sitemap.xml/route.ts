import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

const baseUrl = "https://pg.gouni.edu.ng";

export async function GET(): Promise<Response> {
  try {
    const [courses, news] = await Promise.all([
      fetchQuery(api.courses.getAllCourses, {}),
      fetchQuery(api.news.getNewsList, {}),
    ]);

    const staticRoutes = [
      "",
      "/about-us",
      "/courses",
      "/requirements",
      "/research",
      "/news",
      "/staff",
      "/alumni",
      "/contact",
    ];

    // Generate static URLs
    const staticUrls = staticRoutes.map(
      (route) => `
      <url>
        <loc>${baseUrl}${route}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.8</priority>
      </url>
    `
    );

    // Generate dynamic course URLs with type safety
    const dynamicCourseUrls = (courses ?? []).map(
      (course) => `
      <url>
        <loc>${baseUrl}/courses/${course.slug}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `
    );

    // Generate dynamic news URLs with proper date formatting
    const dynamicNewsUrls = (news ?? []).map(
      (item) => `
      <url>
        <loc>${baseUrl}/news/${item.slug}</loc>
        <lastmod>${new Date(item._creationTime).toISOString()}</lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.7</priority>
      </url>
    `
    );

    // Combine all URLs
    const allUrls = [
      ...staticUrls,
      ...dynamicCourseUrls,
      ...dynamicNewsUrls,
    ].join("");

    // Build sitemap XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
      <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${allUrls}
      </urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response(
      `<?xml version="1.0" encoding="UTF-8"?>
      <error>Sitemap generation failed</error>`,
      {
        status: 500,
        headers: {
          "Content-Type": "application/xml",
        },
      }
    );
  }
}
