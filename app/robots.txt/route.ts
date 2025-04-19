export function GET() {
  return new Response(
    `User-agent: *
Allow: /
Sitemap: https://pg.gouni.edu.ng/sitemap.xml`,
    {
      headers: {
        "Content-Type": "text/plain",
      },
    }
  );
}
