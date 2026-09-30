// convex/news.ts
import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { cloudinaryImage, publicIdsOf } from "./cloudinary";

export const getNewsList = query({
  handler: async (ctx) => {
    const results = await ctx.db.query("news").order("desc").take(100);

    return results.map((doc) => ({
      _id: doc._id,
      _creationTime: doc._creationTime,
      title: doc.title,
      slug: doc.slug,
      coverImage: doc.coverImage,
      images: doc.images,
      author: doc.author,
      views: doc.views,
      updatedOn: doc.updatedOn,
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

export const deleteNews = mutation({
  args: { id: v.id("news") },
  handler: async (ctx, { id }) => {
    const existing = await ctx.db.get(id);
    await ctx.db.delete(id);
    const publicIds = publicIdsOf(existing?.images);
    if (publicIds.length > 0) {
      await ctx.scheduler.runAfter(0, internal.cloudinary.deleteImages, { publicIds });
    }
  },
});

// Images are uploaded straight to Cloudinary by the client (see
// cloudinary.signNewsUpload); only their url + publicId are stored here.
export const addNews = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    content: v.string(),
    images: v.optional(v.array(cloudinaryImage)),
  },
  handler: async (ctx, args) => {
    const slug = args.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60);

    const images = args.images ?? [];

    await ctx.db.insert("news", {
      title: args.title,
      slug,
      author: args.author,
      content: args.content,
      coverImage: images[0]?.url ?? "",
      images: images.length > 0 ? images : undefined,
      views: 0,
    });
  },
});

export const updateNews = mutation({
  args: {
    id: v.id("news"),
    title: v.string(),
    author: v.string(),
    content: v.string(),
    images: v.optional(v.array(cloudinaryImage)),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("News item not found");
    }

    // Replace images if new ones are provided, otherwise keep existing
    let images = existing.images;
    let coverImage = existing.coverImage;

    if (args.images && args.images.length > 0) {
      const kept = new Set(publicIdsOf(args.images));
      const removed = publicIdsOf(existing.images).filter((id) => !kept.has(id));
      if (removed.length > 0) {
        await ctx.scheduler.runAfter(0, internal.cloudinary.deleteImages, {
          publicIds: removed,
        });
      }
      images = args.images;
      coverImage = args.images[0].url;
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      author: args.author,
      content: args.content,
      coverImage,
      images,
      updatedOn: new Date().toISOString(),
    });
  },
});
