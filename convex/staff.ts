import { v } from "convex/values";
import { internal } from "./_generated/api";
import { Doc } from "./_generated/dataModel";
import { QueryCtx, mutation, query } from "./_generated/server";
import { cloudinaryImage } from "./cloudinary";

// Cloudinary photo; falls back to Convex storage for records the migration
// hasn't moved yet.
const photoUrl = async (ctx: QueryCtx, staffMember: Doc<"staff">) =>
  staffMember.imagePublicId && staffMember.image
    ? staffMember.image
    : staffMember.body
      ? await ctx.storage.getUrl(staffMember.body)
      : null;

export const getStaff = query({
  handler: async (ctx) => {
    const staff = await ctx.db.query("staff").collect();

    const staffWithUrls = await Promise.all(
      staff.map(async (staffMember) => ({
        ...staffMember,
        imageUrl: await photoUrl(ctx, staffMember),
      }))
    );
    return staffWithUrls;
  },
});

export const deleteStaff = mutation({
  args: { id: v.id("staff") },
  handler: async (ctx, { id }) => {
    const existing = await ctx.db.get(id);
    await ctx.db.delete(id);
    if (existing?.imagePublicId) {
      await ctx.scheduler.runAfter(0, internal.cloudinary.deleteImages, {
        publicIds: [existing.imagePublicId],
      });
    }
  },
});

// Photos are uploaded straight to Cloudinary by the client (see
// cloudinary.signUpload with folder "staff"); only url + publicId are stored.
export const updateStaff = mutation({
  args: {
    id: v.id("staff"),
    name: v.string(),
    role: v.string(),
    email: v.string(),
    linkedin: v.optional(v.string()),
    profile: v.optional(v.string()),
    image: v.optional(cloudinaryImage),
  },
  handler: async (ctx, args) => {
    const { id, name, role, email, linkedin, profile, image } = args;

    // Fetch existing staff member
    const existingStaff = await ctx.db.get(id);
    if (!existingStaff) throw new Error("Staff member not found");

    // Prepare the data to be updated
    const updateData: {
      name: string;
      role: string;
      email: string;
      linkedin?: string;
      profile?: string;
      image?: string;
      imagePublicId?: string;
    } = {
      name,
      role,
      email,
      linkedin,
      profile,
    };

    // Only replace the photo if a new one is provided
    if (image) {
      updateData.image = image.url;
      updateData.imagePublicId = image.publicId;
      const old = existingStaff.imagePublicId;
      if (old && old !== image.publicId) {
        await ctx.scheduler.runAfter(0, internal.cloudinary.deleteImages, {
          publicIds: [old],
        });
      }
    }

    // Update the staff record in the database
    await ctx.db.patch(id, updateData);

    // Return the updated staff record
    const updated = { ...existingStaff, ...updateData };
    return { ...updated, imageUrl: await photoUrl(ctx, updated) };
  },
});

export const createStaff = mutation({
  args: {
    image: cloudinaryImage,
    name: v.string(),
    role: v.string(),
    email: v.string(),
    linkedin: v.optional(v.string()),
    profile: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("staff", {
      image: args.image.url,
      imagePublicId: args.image.publicId,
      name: args.name,
      role: args.role,
      email: args.email,
      linkedin: args.linkedin,
      profile: args.profile,
      format: "image",
    });
  },
});
