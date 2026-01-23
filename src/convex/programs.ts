import { query } from './_generated/server';

export const getPrograms = query({
	args: {},
	handler: async (ctx) => {
		const programs = await ctx.db.query('programs').collect();
		return programs;
	}
});
