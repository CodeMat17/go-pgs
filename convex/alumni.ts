import { v } from "convex/values";
import { internal } from "./_generated/api";
import { mutation, query } from "./_generated/server";
import { cloudinaryImage } from "./cloudinary";

export const getAlumni = query({
  handler: async (ctx) => {
    return await ctx.db.query("alumni").collect();
  },
});

// Photos are uploaded straight to Cloudinary by the client (see
// cloudinary.signUpload with folder "alumni"); only url + publicId are stored.
export const addAlumni = mutation({
  args: {
    name: v.string(),
    degree: v.string(),
    currentPosition: v.string(),
    testimonial: v.string(),
    linkedin: v.optional(v.string()),
    photo: v.optional(cloudinaryImage),
    graduatedOn: v.optional(v.string()),
    company: v.string(),
    email: v.optional(v.string()),
    tel: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("alumni", {
      name: args.name,
      degree: args.degree,
      currentPosition: args.currentPosition,
      testimonial: args.testimonial,
      linkedin: args.linkedin ?? "",
      company: args.company,
      graduatedOn: args.graduatedOn ?? "",
      photo: args.photo?.url ?? "",
      photoPublicId: args.photo?.publicId,
      email: args.email,
      tel: args.tel,
    });
  },
});

export const updateAlumnus = mutation({
  args: {
    id: v.id("alumni"),
    name: v.string(),
    degree: v.string(),
    currentPosition: v.string(),
    testimonial: v.string(),
    linkedin: v.string(),
    company: v.optional(v.string()),
    graduatedOn: v.optional(v.string()),
    photo: v.optional(cloudinaryImage),
    email: v.optional(v.string()),
    tel: v.string(),
  },
  handler: async (ctx, args) => {
    const { id, photo, ...fields } = args;

    const existing = await ctx.db.get(id);
    if (!existing) throw new Error("Alumnus not found");

    const updateData: typeof fields & { photo?: string; photoPublicId?: string } = {
      ...fields,
    };

    // Only replace the photo if a new one is provided
    if (photo) {
      updateData.photo = photo.url;
      updateData.photoPublicId = photo.publicId;
      const old = existing.photoPublicId;
      if (old && old !== photo.publicId) {
        await ctx.scheduler.runAfter(0, internal.cloudinary.deleteImages, {
          publicIds: [old],
        });
      }
    }

    await ctx.db.patch(id, updateData);

    const updated = { ...existing, ...updateData };
    return { ...updated, imageUrl: updated.photo ?? null };
  },
});

export const deleteAlumnus = mutation({
  args: { id: v.id("alumni") },
  handler: async (ctx, { id }) => {
    const existing = await ctx.db.get(id);
    await ctx.db.delete(id);
    if (existing?.photoPublicId) {
      await ctx.scheduler.runAfter(0, internal.cloudinary.deleteImages, {
        publicIds: [existing.photoPublicId],
      });
    }
  },
});
