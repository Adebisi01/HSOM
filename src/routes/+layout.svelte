<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import { PUBLIC_CONVEX_URL } from '$env/static/public';
	import { setupConvex } from 'convex-svelte';
	import { createSvelteAuthClient } from '@mmailaender/convex-better-auth-svelte/svelte';
	import { authClient } from '$lib/auth-client';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	/** Same deployment as `CONVEX_SITE_URL` default in `api/auth/[...all]/+server.ts` */
	const DEFAULT_PUBLIC_CONVEX_URL = 'https://efficient-swan-827.convex.cloud';
	const convexUrl =
		typeof PUBLIC_CONVEX_URL === 'string' && PUBLIC_CONVEX_URL.length > 0
			? PUBLIC_CONVEX_URL
			: DEFAULT_PUBLIC_CONVEX_URL;
	setupConvex(convexUrl);
	createSvelteAuthClient({ authClient });
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<Toaster position="top-center" />
{@render children()}
