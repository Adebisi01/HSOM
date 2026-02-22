import { superValidate } from 'sveltekit-superforms';

export const load = async ({ params }) => {
	const form = superValidate();
};
