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

  alumni: defineTable({
    name: v.string(),
    photo: v.string(),
    degree: v.string(),
    year: v.number(),
    currentPosition: v.string(),
    company: v.string(),
    testimonial: v.string(),
    linkedin: v.string(),
  }),

  staff: defineTable({
    name: v.string(),
    role: v.string(),
    image: v.string(),
    bio: v.string(),
    email: v.string(),
    profile: v.optional(v.string()),
    social: v.object({
      linkedin: v.string(),
      twitter: v.string(),
    }),
  }),

  whyChoose: defineTable({
    reasons: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
      })
    ),
  }),

  admissionRequirements: defineTable({
    title: v.string(),
    requirements: v.array(v.string()),
  }),

  alternativeAdmissions: defineTable({
    title: v.string(),
    description: v.string(),
  }),
});
