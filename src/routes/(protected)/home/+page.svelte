<script>
	import { invalidateAll } from '$app/navigation';
	import { authClient } from '$lib/auth-client';
	import { Button } from '$lib/components/ui/button';
	// import { zod4 } from 'sveltekit-superforms/adapters';
	// import { fileUploadSchema } from './schema.js';
	// import { superForm } from 'sveltekit-superforms';
	// import { files } from './upload.js';

	// const { data } = $props();
	// // const { form, submitting, enhance } = superForm(data?.form, {
	// // 	validators: zod4(fileUploadSchema),
	// // 	validationMethod: 'onblur',
	// // 	onUpdated: async ({ form }) => {

	// // 		const { data, error } = await authClient.signIn.email({
	// // 			...form.data
	// // 		});
	// // 		if (error && error.message) {
	// // 			toast.error('Invalid credentials');
	// // 		} else if (!error && data.token) {
	// // 			toast.success('Welcome back! Navigating you to the home page');
	// // 			goto(resolve('/home'));
	// // 		}
	// // 	}
	// // });
</script>

<div>
	<Button
		onclick={async () => {
			console.log('triggered');
			const res = await authClient.signOut();
			console.log(res);
			invalidateAll();
		}}
	>
		Sign Out
	</Button>
	<Button
		onclick={async () => {
			// const res = await files();
			// console.log(res);
			try {
				const res = await fetch('/upload', {
					method: 'POST'
				});
				const body = await res.json().catch((error) => console.log('error', error));
				await fetch(body.url, {
					method: 'PUT',
					body: new Blob(['favicon.svg']), // File or Blob
					headers: {
						'Content-Type': 'image/svg' // must match what you set above
					}
				});
			} catch (error) {
				console.log('error', error);
			}
		}}
	>
		CLoud storage
	</Button>
	Home Page
	<Button
		onclick={async () => {
			const res = await fetch('/send', {
				method: 'POST',
				body: JSON.stringify({
					to: 'oluwafemiadebisi01@gmail.com',
					subject: 'Verify your email 😁',
					html: `<p>Click <a href="https://www.google.com">here</a> to verify your email.</p>`
				})
			});
			console.log(res);
		}}>Send mail</Button
	>
</div>
