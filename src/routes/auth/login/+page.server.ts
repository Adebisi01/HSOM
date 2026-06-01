import { superValidate } from 'sveltekit-superforms';
import { loginSchema } from './schema.js';
import { zod4 } from 'sveltekit-superforms/adapters';
import { fail } from '@sveltejs/kit';

export const load = async () => {
	const form = await superValidate(zod4(loginSchema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(loginSchema));
		if (!form.valid) {
			return fail(400, { form });
		}
		console.log('returning success');
		return { form };
	}
};
