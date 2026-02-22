import { z } from 'zod';

export const signupSchema = z.object({
	name: z.string().min(3),
	email: z.email(),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characters')
		.regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
		.regex(/[a-z]/, 'Password must contain at least one lowercase letter')
		.regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
});
