import { getB2Files } from '$lib/server/b2-files';

const DEFAULT_KEY = 'favicon.svg';
const DEFAULT_CONTENT_TYPE = 'image/svg+xml';

/** Presigned GET URL for a key (same credentials as POST). Protect this route in production if keys are sensitive. */
export const GET = async ({ url }) => {
	try {
		const key = url.searchParams.get('key');
		if (!key?.trim()) {
			return Response.json({ error: 'Missing required query: key' }, { status: 400 });
		}
		const files = getB2Files();
		const downloadUrl = await files.url(key, { expiresIn: 3600 });
		return Response.json({ url: downloadUrl });
	} catch (error) {
		return Response.json({ error: String(error) }, { status: 500 });
	}
};

export const POST = async ({ request }) => {
	try {
		let key = DEFAULT_KEY;
		let contentType = DEFAULT_CONTENT_TYPE;
		const ct = request.headers.get('content-type');
		if (ct?.includes('application/json')) {
			const body = (await request.json().catch(() => null)) as {
				key?: string;
				contentType?: string;
			} | null;
			if (body?.key && typeof body.key === 'string') key = body.key;
			if (body?.contentType && typeof body.contentType === 'string') contentType = body.contentType;
		}

		const files = getB2Files();
		const signed = await files.signedUploadUrl(key, {
			expiresIn: 3600,
			contentType
		});

		if (signed.method !== 'PUT') {
			return Response.json(
				{ error: 'Expected PUT signed upload; got ' + signed.method },
				{ status: 500 }
			);
		}

		return Response.json({
			url: signed.url,
			headers: signed.headers ?? {}
		});
	} catch (error) {
		return Response.json({ error: String(error) }, { status: 500 });
	}
};
