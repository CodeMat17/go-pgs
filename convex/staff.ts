import { query } from "./_generated/server";

export const getStaff = query({
  handler: async (ctx) => {
    const staff = await ctx.db.query("staff").collect();

    const staffWithUrls = await Promise.all(
      staff.map(async (staffMember) => {
        const imageUrl = staffMember.body
          ? await ctx.storage.getUrl(staffMember.body)
          : null;

        return {
          id: staffMember._id,
          name: staffMember.name,
          role: staffMember.role,
          email: staffMember.email,
          linkedin: staffMember.linkedin,
          profile: staffMember.profile,
          imageUrl,
        };
      })
    );
    return staffWithUrls;
  },
});
