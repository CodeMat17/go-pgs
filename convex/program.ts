import { query } from './_generated/server'

export const getProgram = query({
    handler: async (ctx) => {
        return await ctx.db.query('program').collect()
    }
})