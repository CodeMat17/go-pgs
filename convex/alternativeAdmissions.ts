import { query } from './_generated/server'

export const getAlternativeAdmissionRoute = query({
    handler: async (ctx) => {
        return await ctx.db.query('alternativeAdmissions').collect()
    }
})