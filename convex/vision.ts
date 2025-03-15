import { query } from './_generated/server'

export const getVision = query({
    handler: async (ctx) => {
        return await ctx.db.query('vision').collect()
    }
})