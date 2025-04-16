import { v } from "convex/values";
import { query } from "./_generated/server";
import { courseType } from "./schema";

export const getCoursesByType = query({
    args: { type: courseType },
    handler: async (ctx, { type }) => {
        return await ctx.db.query("courses").withIndex("by_type", q => q.eq("type", type)).collect()
    }
})

export const getProgramBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("courses")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});