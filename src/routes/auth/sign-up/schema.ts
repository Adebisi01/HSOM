import { z } from 'zod';

export const schema = z
	.object({
		name: z.string().min(3),
		email: z.email(),
		password: z
			.string()
			.min(8, 'Password must be at least 8 characters')
			.regex(/[A-Z]/, '\nPassword must contain at least one uppercase letter')
			.regex(/[a-z]/, '\nPassword must contain at least one lowercase letter')
			.regex(/[^A-Za-z0-9]/, '\nPassword must contain at least one special character'),
		confirm_password: z.string()
	})
	.refine(({ password, confirm_password }) => password === confirm_password, {
		message: 'comfirm password must be same as password',
		path: ['confirm_password']
	});
