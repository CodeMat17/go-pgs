import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  hero: defineTable({
    title: v.string(),
    desc: v.array(v.string()),
  }),

  vision: defineTable({
    title: v.string(),
    desc: v.string(),
  }),

  mission: defineTable({
    title: v.string(),
    desc: v.string(),
  }),

  program: defineTable({
    title: v.string(),
    duration: v.string(),
    mode: v.string(),
    slug: v.string(),
    status: v.boolean(),
  }),
});
