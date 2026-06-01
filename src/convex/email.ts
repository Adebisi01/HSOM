export const sendmail = async ({
	to,
	subject,
	html
}: {
	to: string;
	subject: string;
	html: string;
}) => {
	console.log('Got to send mail function');
	const res = await fetch('/send', {
		method: 'POST',
		body: JSON.stringify({
			to: to,
			subject: subject,
			html: html
		})
	});
	console.log('email sent', res);
};
