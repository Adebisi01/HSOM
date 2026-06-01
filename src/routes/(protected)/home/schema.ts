import { z } from 'zod';

export const fileUploadSchema = z.object({
	title: z.string(),
	type: z.string(),
	tag: z.string()
});
