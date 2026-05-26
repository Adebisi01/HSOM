import { fail } from '@sveltejs/kit';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { authClient } from '$lib/auth-client.js';
import { schema } from './schema.js';

type Message = {
	type: 'success' | 'error';
	text: string | undefined;
};

export const load = async () => {
	const form = await superValidate(zod4(schema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		// validate form
		const form = await superValidate(request, zod4(schema));
		// return error if form is not valid
		if (!form.valid) {
			return fail(400, { form });
		}
		// sign up
		const { error, data } = await authClient.signUp.email({
			...form.data
		});
		console.log(data, error);
		// return error to client if error occurs from better auth
		if (error) {
			return message<Message>(form, { type: 'error', text: error?.message });
		} else if (!error && data.token) {
			// else return success
			return message<Message>(form, {
				type: 'success',
				text: 'Welcome to HSOM. Navigating you to the home page '
			});
		}
	}
};
