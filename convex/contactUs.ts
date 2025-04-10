import {  query } from "./_generated/server";

export const getContactInfo = query({
  handler: async (ctx) => {
    return await ctx.db.query("contactUs").first();
  },
});
