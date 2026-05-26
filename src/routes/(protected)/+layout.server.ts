import { authClient } from '$lib/auth-client';
import { inspect } from 'util';

export const load = async ({ url }) => {
	const data = await authClient.getSession();
	console.log(data);
};
