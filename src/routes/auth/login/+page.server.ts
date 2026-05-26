import { message, superValidate } from 'sveltekit-superforms';
import { loginSchema } from './schema.js';
import { zod4 } from 'sveltekit-superforms/adapters';
import { authClient } from '$lib/auth-client.js';
import { fail } from '@sveltejs/kit';

type Message = {
	type: 'success' | 'error';
	text: string | undefined;
};

export const load = async () => {
	const form = superValidate(zod4(loginSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(loginSchema));
		console.log(form);
		if (!form.valid) {
			return fail(400, form);
		}
		const { data, error } = await authClient.signIn.email({
			...form.data
		});
		if (error) {
			return message<Message>(form, { type: 'error', text: error?.message });
		} else if (data.token) {
			return message<Message>(form, { type: 'success', text: 'Welcome Back' });
		}
		return { form };
	}
};
