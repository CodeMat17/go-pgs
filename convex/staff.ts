import { query } from "./_generated/server";

export const getStaff = query({
  handler: async (ctx) => {
    return await ctx.db.query("staff").collect();
  },
});
