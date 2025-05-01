import { v } from "convex/values";
import { query } from "./_generated/server";
import { courseType, facultyType } from "./schema";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("courses").collect();
  },
});

export const getCoursesByType = query({
  args: { type: courseType },
  handler: async (ctx, { type }) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_type", (q) => q.eq("type", type))
      .collect();
  },
});

// convex/courses.ts
export const getCoursesByFaculty = query({
  args: {
    faculty: facultyType,
    type: v.optional(courseType)
  },
  handler: async (ctx, args) => {
    let query = ctx.db.query("courses")
      .withIndex("by_faculty", q => q.eq("faculty", args.faculty));

    if (args.type) {
      query = query.filter(q => q.eq(q.field("type"), args.type));
    }

    return query.collect();
  },
});

export const getProgramBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});

export const getFileUrl = query({
  args: { fileId: v.id("_storage") },
  handler: async (ctx, args) => {
    return await ctx.storage.getUrl(args.fileId);
  },
});