// On-demand revalidation: Convex content mutations POST here (go-pgs-admin: convex/revalidate.ts) so
// pages regenerate only when their data actually changes.
// Requires REVALIDATE_SECRET in the Vercel env (same value as in Convex).
import { isCacheTag, type CacheTag } from "@/lib/server-data";
import { revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret || request.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const tags: CacheTag[] = Array.isArray(body?.tags)
    ? [...new Set((body.tags as unknown[]).filter(isCacheTag))]
    : [];
  if (tags.length === 0) {
    return Response.json({ error: "No valid tags" }, { status: 400 });
  }

  // Expire immediately so the next visitor gets the edit, not a stale copy.
  for (const tag of tags) revalidateTag(tag, { expire: 0 });

  return Response.json({ revalidated: tags });
}
