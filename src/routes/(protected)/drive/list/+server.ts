import { getB2Files } from '$lib/server/b2-files';
import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from '@sveltejs/kit';

/**
 * Lists object keys in the configured B2 bucket (same credentials as `/upload/direct`).
 * Requires a signed-in session (`locals.token`).
 */
export const GET: RequestHandler = async ({ locals, url }) => {
	if (!locals.token) {
		error(401, 'Unauthorized');
	}
	const prefix = (url.searchParams.get('prefix') ?? 'uploads/').trim() || undefined;
	const limitRaw = url.searchParams.get('limit');
	const limit = limitRaw ? Math.min(1000, Math.max(1, Number(limitRaw) || 50)) : 50;

	try {
		const files = getB2Files();
		const { items, cursor } = await files.list({ prefix, limit });
		return json({
			prefix: prefix ?? '',
			cursor: cursor ?? null,
			count: items.length,
			keys: items.map((f) => ({
				key: f.key,
				size: f.size,
				lastModified: f.lastModified ?? null
			}))
		});
	} catch (e) {
		return json({ error: String(e) }, { status: 500 });
	}
};
