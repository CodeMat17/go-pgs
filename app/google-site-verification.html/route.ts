export function GET() {
  return new Response(
    `<meta name="google-site-verification" content="1JdJykuzZ8V4A8B0QyhPz7d6U1BZ5uwqpsldRCIadAU" />`,
    {
      headers: {
        "Content-Type": "text/html",
      },
    }
  );
}
