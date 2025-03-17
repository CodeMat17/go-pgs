import { query } from "./_generated/server";

export const getAlumni = query({
  handler: async (ctx) => {
    return await ctx.db.query("alumni").collect();
  },
});
