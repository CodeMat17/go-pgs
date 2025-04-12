// convex/news.ts
import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getNewsList = query({
  handler: async (ctx) => {
    const results = await ctx.db.query("news").order("desc").take(100);

    return results.map((doc) => ({
      _id: doc._id,
      title: doc.title,
      slug: doc.slug,
      coverImage: doc.coverImage,
      author: doc.author,
      views: doc.views,
      publicationDate: doc.publicationDate,
    }));
  },
});

export const getNewsBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("news")
      .filter((q) => q.eq(q.field("slug"), slug))
      .unique();
  },
});

export const incrementViews = mutation({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const newsItem = await ctx.db
      .query("news")
      .filter((q) => q.eq(q.field("slug"), slug))
      .unique();

    if (newsItem) {
      await ctx.db.patch(newsItem._id, { views: (newsItem.views || 0) + 1 });
    }
  },
});
