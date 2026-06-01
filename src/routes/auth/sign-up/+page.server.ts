import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { schema } from './schema.js';

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
		return { form };
	}
};
