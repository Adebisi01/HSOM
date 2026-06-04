import type { Cookies } from '@sveltejs/kit';
import { JWT_COOKIE_NAME } from '@convex-dev/better-auth/plugins';
import { createCookieGetter } from 'better-auth/cookies';
import type { createAuth } from '$convex/auth.js';

type CreateAuth = typeof createAuth;

/**
 * Reads the Convex JWT cookie used for SSR / protected routes.
 * Falls back to alternate __Secure- / non-secure cookie names because
 * `getToken` from @mmailaender/convex-better-auth-svelte reads alternates
 * but does not return them when the primary name misses.
 */
export function readConvexJwtCookie(createAuth: CreateAuth, cookies: Cookies): string | undefined {
	let token: string | undefined;
	try {
		const options = createAuth({} as Parameters<CreateAuth>[0]).options;
		const createCookie = createCookieGetter(options);
		const { name } = createCookie(JWT_COOKIE_NAME);
		token = cookies.get(name) ?? undefined;
		if (token) return token;
		const insecureName = name.startsWith('__Secure-') ? name.slice('__Secure-'.length) : name;
		const secureName = name.startsWith('__Secure-') ? name : `__Secure-${insecureName}`;
		return cookies.get(insecureName) ?? cookies.get(secureName) ?? undefined;
	} catch {
		return token;
	}
}
