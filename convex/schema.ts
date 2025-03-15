import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  hero: defineTable({
    title: v.string(),
    desc: v.array(v.string()),
  }),
});
