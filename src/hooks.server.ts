// import { auth } from '$lib/auth'; // path to your auth file
// import { svelteKitHandler } from 'better-auth/svelte-kit';
// import { building } from '$app/environment';
import type { Handle } from '@sveltejs/kit';
import { createAuth } from '$convex/auth.js';
import { getToken } from '@mmailaender/convex-better-auth-svelte/sveltekit';
import { readConvexJwtCookie } from '$lib/server/convex-jwt-cookie';

// export async function handle({ event, resolve }) {
// 	return svelteKitHandler({ event, resolve, auth, building });
// }

export const handle: Handle = async ({ event, resolve }) => {
	const tokenFromGet = await getToken(createAuth, event.cookies);
	const tokenFromFallback = readConvexJwtCookie(createAuth, event.cookies);
	event.locals.token = tokenFromGet ?? tokenFromFallback;
	return resolve(event);
};
