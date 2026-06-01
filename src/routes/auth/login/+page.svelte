<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { toast } from 'svelte-sonner';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { loginSchema } from './schema.js';
	import { authClient } from '$lib/auth-client.js';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';

	const { data } = $props();
	const { form, submitting, enhance } = superForm(data?.form, {
		validators: zod4(loginSchema),
		validationMethod: 'onblur',
		onUpdated: async ({ form }) => {
			const { data, error } = await authClient.signIn.email({
				...form.data
			});
			if (error && error.message) {
				toast.error('Invalid credentials');
			} else if (!error && data.token) {
				toast.success('Welcome back! Navigating you to the home page');
				goto(resolve('/home'));
			}
		}
	});
</script>

<div class="h-screen w-full">
	<div class="flex items-center justify-center py-10">
		<Card.Root class="-my-4 w-full max-w-sm">
			<Card.Header>
				<Card.Title class="text-2xl">Create account</Card.Title>
				<Card.Description class="text-lg"
					>Enter your details to create a new account</Card.Description
				>
				<!-- <Card.Action
				<Button variant="link">Sign Up</Button>
			</Card.Action> -->
			</Card.Header>
			<Card.Content>
				<form method="POST" id="login-form" use:enhance novalidate>
					<div class="flex flex-col gap-6">
						<div class="grid gap-2">
							<Label for="email">Email address</Label>
							<Input
								id="email"
								type="email"
								placeholder="example@gmail.com"
								required
								name="email"
								bind:value={$form.email}
							/>
						</div>
						<div class="grid gap-2">
							<Label for="email">Password</Label>
							<Input
								id="password"
								type="password"
								name="password"
								bind:value={$form.password}
								placeholder="Enter your password"
								required
							/>
						</div>

						<div class="grid gap-2">
							<!-- <div class="flex items-center">
							<Label for="password">Password</Label>
							<a href="##" class="ms-auto inline-block text-sm underline-offset-4 hover:underline">
								Forgot your password?
							</a>
						</div> -->
							<!-- <Input id="password" type="password" required /> -->
						</div>
					</div>
				</form>
			</Card.Content>
			<Card.Footer class="flex-col gap-2">
				<Button form="login-form" type="submit" class="w-full"
					>{$submitting ? 'Logging you in...' : 'Login'}</Button
				>
				<Button variant="outline" class="w-full">Login with Google</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
