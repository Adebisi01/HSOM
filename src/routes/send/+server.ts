import { Resend } from 'resend';
import { RESEND_API_KEY } from '$env/static/private'; // define in your .env file

const resend = new Resend(RESEND_API_KEY);
export type EmailBody = {
	to: string;
	subject: string;
	html: string;
};
export async function POST({ request }) {
	try {
		console.log('POST request received');
		const body: EmailBody = await request.json();
		console.log(body.to);
		const { data, error } = await resend.emails.send({
			from: 'onboarding@resend.dev',
			...body
		});

		if (error) {
			return Response.json({ error }, { status: 500 });
		}

		console.log(data, 'null null');
		return Response.json({ data });
	} catch (error) {
		return Response.json({ error }, { status: 500 });
	}
}
