import { v } from "convex/values";
import { query } from "./_generated/server";

export const getPrograms = query({
  handler: async (ctx) => {
    return await ctx.db.query("programs").collect();
  },
});

export const getProgramBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("programs")
      .withIndex("by_slug", (q) => q.eq("slug", args.slug))
      .first();
  },
});
