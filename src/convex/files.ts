import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

export const getFiles = query({
	args: {},
	handler: async (ctx) => {
		const files = await ctx.db.query('files').collect();
		return files;
	}
});
export const getFileById = query({
	args: { id: v.id('files') },
	handler: async (ctx, args) => {
		return await ctx.db.get('files', args.id);
	}
});
export const createFile = mutation({
	args: {
		title: v.string(),
		url: v.string(),
		type: v.string(),
		tag: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const file = await ctx.db.insert('files', args);
		return file;
	}
});
