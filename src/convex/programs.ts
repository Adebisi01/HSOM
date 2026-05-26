// import { mutation, query } from './_generated/server';
// import { v } from 'convex/values';

// //Get all programs
// export const getPrograms = query({
// 	args: {},
// 	handler: async (ctx) => {
// 		const programs = await ctx.db.query('programs').collect();
// 		return programs;
// 	}
// });

// //Get program by programId
// export const getProgramById = query({
// 	args: { programId: v.id('programs') },
// 	handler: async (ctx, args) => {
// 		const program = await ctx.db.get('programs', args.programId);
// 		return program;
// 	}
// });

// // Add program
// export const createProgram = mutation({
// 	args: {
// 		courses: v.array(v.id('courses')),
// 		title: v.string(),
// 		image: v.string(),
// 		students: v.array(v.id('users'))
// 	},
// 	handler: async (ctx, args) => {
// 		const programId = await ctx.db.insert('programs', args);
// 		return programId;
// 	}
// });
