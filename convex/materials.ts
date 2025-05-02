// convex/materials.ts
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { facultyType, courseType } from "./schema";

export const getAll = query({
  handler: async (ctx) => {
    return await ctx.db.query("materials").collect();
  },
});

export const getMaterialsByFacultyType = query({
  args: {
    faculty: facultyType,
    type: courseType,
  },
  handler: async ({ db }, args) => {
    return await db
      .query("materials")
      .withIndex("by_faculty_type", (q) =>
        q.eq("faculty", args.faculty).eq("type", args.type)
      )
      .collect();
  },
});

export const downloadFile = mutation({
  args: {
    storageId: v.id("_storage"),
  },
  handler: async (ctx, args) => {
    // Get download URL for the stored file
    const url = await ctx.storage.getUrl(args.storageId);

    if (!url) {
      throw new Error("File not found");
    }

    return url;
  },
});
