import { v } from "convex/values";
import sanitizeHtml from "sanitize-html";
import { generateSlug } from "../lib/slugUtils";
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { cloudinaryImage, publicIdsOf } from "./cloudinary";

// ── Writings ──────────────────────────────────────────────────────────────────

export const getPostgradPenList = query({
  handler: async (ctx) => {
    return await ctx.db.query("postgradPen").order("desc").collect();
  },
});

export const getPostgradPenBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    return await ctx.db
      .query("postgradPen")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
  },
});

export const addPostgradPen = mutation({
  args: {
    title: v.string(),
    author: v.string(),
    content: v.string(),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const slug = generateSlug(args.title);
    const existing = await ctx.db
      .query("postgradPen")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (existing) throw new Error("A piece with this title already exists");

    const cleanContent = sanitizeHtml(args.content, {
      allowedTags: ["p", "strong", "em", "u", "h2", "h3", "ul", "ol", "li", "blockquote", "a"],
      allowedAttributes: { a: ["href", "target", "rel"] },
    });

    return await ctx.db.insert("postgradPen", {
      title: args.title,
      slug,
      content: cleanContent,
      author: args.author,
      category: args.category,
      views: 0,
    });
  },
});

export const updatePostgradPen = mutation({
  args: {
    id: v.id("postgradPen"),
    title: v.optional(v.string()),
    author: v.optional(v.string()),
    content: v.optional(v.string()),
    category: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Writing not found");

    const patch: Record<string, unknown> = { updatedOn: Date.now() };
    if (args.title !== undefined) {
      patch.title = args.title;
      if (args.title !== existing.title) patch.slug = generateSlug(args.title);
    }
    if (args.author !== undefined) patch.author = args.author;
    if (args.content !== undefined) {
      patch.content = sanitizeHtml(args.content, {
        allowedTags: ["p", "strong", "em", "u", "h2", "h3", "ul", "ol", "li", "blockquote", "a"],
        allowedAttributes: { a: ["href", "target", "rel"] },
      });
    }
    if (args.category !== undefined) patch.category = args.category;

    await ctx.db.patch(args.id, patch);
  },
});

export const deletePostgradPen = mutation({
  args: { id: v.id("postgradPen") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
  },
});

export const incrementPenViews = mutation({
  args: { slug: v.string() },
  handler: async (ctx, { slug }) => {
    const doc = await ctx.db
      .query("postgradPen")
      .withIndex("by_slug", (q) => q.eq("slug", slug))
      .first();
    if (doc) await ctx.db.patch(doc._id, { views: doc.views + 1 });
  },
});

// ── Spotlight ─────────────────────────────────────────────────────────────────

export const getSpotlights = query({
  handler: async (ctx) => {
    return await ctx.db.query("postgradSpotlight").order("desc").collect();
  },
});

// Photos are uploaded straight to Cloudinary by the client (see
// cloudinary.signUpload with folder "spotlight"); only url + publicId are stored.
export const addSpotlight = mutation({
  args: {
    name: v.string(),
    program: v.string(),
    faculty: v.string(),
    bio: v.string(),
    achievement: v.optional(v.string()),
    photos: v.array(cloudinaryImage),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("postgradSpotlight", {
      name: args.name,
      program: args.program,
      faculty: args.faculty,
      bio: args.bio,
      achievement: args.achievement,
      photos: args.photos,
    });
  },
});

export const updateSpotlight = mutation({
  args: {
    id: v.id("postgradSpotlight"),
    name: v.optional(v.string()),
    program: v.optional(v.string()),
    faculty: v.optional(v.string()),
    bio: v.optional(v.string()),
    achievement: v.optional(v.string()),
    photos: v.optional(v.array(cloudinaryImage)),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) throw new Error("Spotlight not found");

    const patch: Record<string, unknown> = {};
    if (args.name !== undefined) patch.name = args.name;
    if (args.program !== undefined) patch.program = args.program;
    if (args.faculty !== undefined) patch.faculty = args.faculty;
    if (args.bio !== undefined) patch.bio = args.bio;
    if (args.achievement !== undefined) patch.achievement = args.achievement;

    if (args.photos && args.photos.length > 0) {
      const kept = new Set(publicIdsOf(args.photos));
      const removed = publicIdsOf(existing.photos).filter((id) => !kept.has(id));
      if (removed.length > 0) {
        await ctx.scheduler.runAfter(0, internal.cloudinary.deleteImages, {
          publicIds: removed,
        });
      }
      patch.photos = args.photos;
    }

    await ctx.db.patch(args.id, patch);
  },
});

export const deleteSpotlight = mutation({
  args: { id: v.id("postgradSpotlight") },
  handler: async (ctx, { id }) => {
    const existing = await ctx.db.get(id);
    await ctx.db.delete(id);
    const publicIds = publicIdsOf(existing?.photos);
    if (publicIds.length > 0) {
      await ctx.scheduler.runAfter(0, internal.cloudinary.deleteImages, { publicIds });
    }
  },
});
