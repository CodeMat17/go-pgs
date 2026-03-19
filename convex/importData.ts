import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { TableNames } from "./_generated/dataModel";

// ── Export all tables as raw arrays (call this on the SOURCE deployment) ────

export const exportAllData = query({
  handler: async (ctx) => {
    const [
      hero,
      vision,
      mission,
      admissionRequirements,
      alternativeAdmissions,
      contactUs,
      howToApply,
      alumni,
      courses,
      programs,
      faculties,
      whyChoose,
      staff,
      news,
      fees,
      examTimetable,
      lectureTimetable,
      materials,
      gpc,
      postgradPen,
      postgradSpotlight,
      students,
    ] = await Promise.all([
      ctx.db.query("hero").collect(),
      ctx.db.query("vision").collect(),
      ctx.db.query("mission").collect(),
      ctx.db.query("admissionRequirements").collect(),
      ctx.db.query("alternativeAdmissions").collect(),
      ctx.db.query("contactUs").collect(),
      ctx.db.query("howToApply").collect(),
      ctx.db.query("alumni").collect(),
      ctx.db.query("courses").collect(),
      ctx.db.query("programs").collect(),
      ctx.db.query("faculties").collect(),
      ctx.db.query("whyChoose").collect(),
      ctx.db.query("staff").collect(),
      ctx.db.query("news").collect(),
      ctx.db.query("fees").collect(),
      ctx.db.query("examTimetable").collect(),
      ctx.db.query("lectureTimetable").collect(),
      ctx.db.query("materials").collect(),
      ctx.db.query("gpc").collect(),
      ctx.db.query("postgradPen").collect(),
      ctx.db.query("postgradSpotlight").collect(),
      ctx.db.query("students").collect(),
    ]);

    return {
      hero,
      vision,
      mission,
      admissionRequirements,
      alternativeAdmissions,
      contactUs,
      howToApply,
      alumni,
      courses,
      programs,
      faculties,
      whyChoose,
      staff,
      news,
      fees,
      examTimetable,
      lectureTimetable,
      materials,
      gpc,
      postgradPen,
      postgradSpotlight,
      students,
    };
  },
});

// ── Import a single table into the TARGET deployment ────────────────────────
// Strips _id and _creationTime before inserting so Convex assigns fresh IDs.

export const importTableData = mutation({
  args: {
    table: v.string(),
    documents: v.array(v.any()),
  },
  handler: async (ctx, { table, documents }) => {
    let inserted = 0;
    for (const doc of documents) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { _id, _creationTime, ...clean } = doc;
      await ctx.db.insert(table as TableNames, clean);
      inserted++;
    }
    return inserted;
  },
});

// ── Clear a single table (useful before re-importing) ───────────────────────

export const clearTable = mutation({
  args: { table: v.string() },
  handler: async (ctx, { table }) => {
    const docs = await ctx.db.query(table as TableNames).collect();
    for (const doc of docs) {
      await ctx.db.delete(doc._id);
    }
    return docs.length;
  },
});
