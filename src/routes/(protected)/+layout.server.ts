import { redirect } from '@sveltejs/kit';

export const load = async ({ locals, url }) => {
	if (!locals.token) {
		redirect(303, `/auth/login?redirectTo=${url.pathname}`);
	}
};
