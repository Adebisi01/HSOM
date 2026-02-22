import { mutation, query } from './_generated/server';
import { v } from 'convex/values';
export const getCourses = query({
	args: {},
	handler: async (ctx) => {
		const courses = await ctx.db.query('courses').collect();
		return courses;
	}
});
export const createCourse = mutation({
	args: {
		title: v.string(),
		image: v.string(),
		description: v.string(),
		attachments: v.array(v.string()),
		sections: v.array(
			v.object({
				title: v.string(),
				audio: v.string()
			})
		)
	},
	handler: async (ctx, args) => {
		const courseId = await ctx.db.insert('courses', args);
		return courseId;
	}
});
