import { query } from './_generated/server';

export const get = query({
	args: {},
	handler: async (ctx) => {
		const tasks = await ctx.db.query('tasks').collect();

		return tasks.map((task) => ({ ...task, assigner: 'tom' }));
	}
});
export const getPrograms = query({
	args: {},
	handler: async (ctx) => {
		const programs = await ctx.db.query('programs').collect();
		return programs;
	}
});
