import { api } from "@/convex/_generated/api";
import { fetchQuery } from "convex/nextjs";

const baseUrl = "https://pg.gouni.edu.ng"; 

export async function GET(): Promise<Response> {
    const [courses, news] = await Promise.all([
        fetchQuery(api.courses.getAll, {}),
        fetchQuery(api.news.getAll, {}),
 ])
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

  const dynamicCourseUrls = courses.map(
    (course) => `
    <url>
      <loc>${baseUrl}/courses/${course.slug}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `
  );

  const dynamicNewsUrls = news.map(
    (item) => `
    <url>
      <loc>${baseUrl}/news/${item.slug}</loc>
      <lastmod>${new Date(item._creationTime).toISOString()}</lastmod>
      <changefreq>weekly</changefreq>
      <priority>0.7</priority>
    </url>
  `
  );

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${[...staticUrls, ...dynamicCourseUrls, ...dynamicNewsUrls].join("")}
    </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
