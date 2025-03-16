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

  programs: defineTable({
    programFullName: v.optional(v.string()),
    programShortName: v.string(),
    programOverview: v.string(),
    whyChoose: v.array(
      v.object({
        title: v.string(), // e.g., "Cutting-Edge Facilities"
        description: v.string(), // e.g., "Access to state-of-the-art labs and research equipment"
      })
    ),
    nextIntake: v.string(),
    studyDuration: v.string(),
    deliveryMode: v.string(),
    studyMode: v.string(),
    slug: v.string(),
    status: v.boolean(),
  }).index("by_slug", ["slug"]),
});
