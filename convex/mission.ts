import { query } from './_generated/server'

export const getMission = query({
    handler: async (ctx) => {
        return await ctx.db.query('mission').collect()
    }
})