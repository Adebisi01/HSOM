import { createSvelteKitHandler } from '@mmailaender/convex-better-auth-svelte/sveltekit';

export const { GET, POST } = createSvelteKitHandler({
	convexSiteUrl: process.env.CONVEX_SITE_URL ?? 'https://efficient-swan-827.convex.site'
});
