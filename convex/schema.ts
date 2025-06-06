import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export const courseType = v.union(
  v.literal("pgd"),
  v.literal("masters"),
  v.literal("phd")
);

export const facultyType = v.union(
  v.literal("Faculty of Arts"),
  v.literal("Faculty of Education"),
  v.literal("Faculty of Mgt. & Social Sciences"),
  v.literal("Faculty of Nat. Science & Environmental Studies"),
  v.literal("Faculty of Law")
);

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

  alumni: defineTable({
    name: v.string(),
    photo: v.optional(v.string()),
    degree: v.string(),
    year: v.optional(v.number()),
    currentPosition: v.string(),
    company: v.string(),
    testimonial: v.string(),
    linkedin: v.string(),
    storageId: v.optional(v.string()),
    graduatedOn: v.optional(v.string()),
    phone: v.optional(v.number()),
    email: v.optional(v.string()),
    tel: v.optional(v.string()),
  }),

  staff: defineTable({
    name: v.string(),
    role: v.string(),
    body: v.optional(v.id("_storage")),
    imageStorageId: v.optional(v.id("_storage")),
    bio: v.optional(v.string()),
    email: v.string(),
    profile: v.optional(v.string()),
    linkedin: v.optional(v.string()),
    format: v.optional(v.string()),
    social: v.optional(
      v.object({
        linkedin: v.string(),
        twitter: v.string(),
      })
    ),
    image: v.optional(v.string()),
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

  contactUs: defineTable({
    address: v.string(),
    email: v.optional(
      v.array(
        v.object({
          email1: v.string(),
          email2: v.string(),
        })
      )
    ),
    phone: v.optional(
      v.array(
        v.object({
          tel1: v.string(),
          tel2: v.string(),
        })
      )
    ),
    officeHours: v.optional(
      v.array(
        v.object({
          days: v.string(),
          time: v.string(),
        })
      )
    ),
    researchOffice: v.optional(
      v.array(
        v.object({
          email: v.string(),
          tel: v.string(),
        })
      )
    ),
    studentSupport: v.optional(
      v.array(
        v.object({
          email: v.string(),
          tel: v.string(),
        })
      )
    ),
    admissionOffice: v.optional(
      v.array(
        v.object({
          email: v.string(),
          tel: v.string(),
        })
      )
    ),
  }),

  news: defineTable({
    title: v.string(),
    slug: v.string(),
    content: v.string(),
    excerpt: v.optional(v.string()),
    coverImage: v.string(),
    author: v.string(),
    publicationDate: v.optional(v.number()),
    views: v.number(),
    updatedOn: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    storageId: v.optional(v.id("_storage")),
  })
    .index("by_slug", ["slug"])
    .index("by_date", ["publicationDate"]),

  courses: defineTable({
    course: v.string(),
    slug: v.string(),
    duration: v.string(),
    mode: v.string(),
    overview: v.string(),
    type: courseType,
    whyChoose: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
      })
    ),
    faculty: facultyType,
  })
    .index("by_slug", ["slug"])
    .index("by_type", ["type"])
    .index("by_faculty", ["faculty"])
    .index("by_faculty_type", ["faculty", "type"]),

  programs: defineTable({
    programFullName: v.optional(v.string()),
    programShortName: v.string(),
    programOverview: v.string(),
    whyChoose: v.array(
      v.object({
        title: v.string(),
        description: v.string(),
      })
    ),
    nextIntake: v.string(),
    studyDuration: v.string(),
    deliveryMode: v.string(),
    studyMode: v.string(),
    slug: v.string(),
    status: v.boolean(),
  }).index("by_slug", ["slug"]),

  howToApply: defineTable({
    text: v.string(),
    link: v.string(),
  }),

  students: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.string(),
    regno: v.string(),
    faculty: facultyType,
    type: courseType,
  })
    .index("by_regno", ["regno"])
    .index("by_faculty_type", ["faculty", "type"])
    .index("by_faculty", ["faculty"])
    .index("by_type", ["type"]),

  materials: defineTable({
    faculty: facultyType,
    type: courseType,
    title: v.string(),
    semester: v.optional(v.union(v.literal(1), v.literal(2))),
    description: v.string(),
    file: v.id("_storage"),
    downloads: v.optional(v.number()),
  }).index("by_faculty_type", ["faculty", "type"]),

  gpc: defineTable({
    faculty: facultyType,
    type: courseType,
    title: v.string(),
    semester: v.optional(v.union(v.literal(1), v.literal(2))),
    description: v.string(),
    file: v.id("_storage"),
    downloads: v.optional(v.number()),
  }).index("by_faculty_type", ["faculty", "type"]),

  pgdFees: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    amount: v.string(),
    details: v.array(
      v.object({
        bank: v.string(),
        accountNumber: v.string(),
        accountName: v.string(),
      })
    ),
  }),

  mastersFees: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    amount: v.string(),
    details: v.array(
      v.object({
        bank: v.string(),
        accountNumber: v.string(),
        accountName: v.string(),
      })
    ),
  }),

  phdGeneralFees: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    amount: v.string(),
    details: v.array(
      v.object({
        bank: v.string(),
        accountNumber: v.string(),
        accountName: v.string(),
      })
    ),
  }),

  phdNatSciFees: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    amount: v.string(),
    details: v.array(
      v.object({
        bank: v.string(),
        accountNumber: v.string(),
        accountName: v.string(),
      })
    ),
  }),

  phdEduFees: defineTable({
    title: v.string(),
    description: v.optional(v.string()),
    amount: v.string(),
    details: v.array(
      v.object({
        bank: v.string(),
        accountNumber: v.string(),
        accountName: v.string(),
      })
    ),
  }),

  additionalFees: defineTable({
    title: v.string(),
    amount: v.string(),
    description: v.optional(v.string()),
    bank: v.string(),
    accountNumber: v.string(),
    accountName: v.string(),
  }),

  extraFeesAccount: defineTable({
    bankName: v.string(),
    accountNumber: v.string(),
    accountName: v.string(),
  }),

  extraFees: defineTable({
    feeType: v.union(
      v.literal("Course Deferment"),
      v.literal("Development Levy"),
      v.literal("Exams Levy"),
      v.literal("Change of Supervisor"),
      v.literal("Change of Department"),
      v.literal("Utility Levy"),
      v.literal("Carryover Fee")
    ),
    amount: v.string(),
    carryoverNote: v.optional(v.string()),
  }).index("by_feeType", ["feeType"]),
});
