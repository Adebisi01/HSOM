<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { superForm } from 'sveltekit-superforms';
	import { zod4 } from 'sveltekit-superforms/adapters';
	import { schema } from './schema.js';
	import { toast } from 'svelte-sonner';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import { authClient } from '$lib/auth-client.js';

	let { data } = $props();

	const { form, errors, enhance, submitting } = superForm(data.form, {
		validators: zod4(schema),
		validationMethod: 'onblur',
		onUpdated: async ({ form }) => {
			const { error, data } = await authClient.signUp.email({
				...form.data
			});
			console.log(error);
			if (error && error.message) {
				toast.error(error?.message);
			} else if (!error && data.token) {
				toast.success('Welcome to HSOM. Navigating you to the home page');
				goto(resolve('/home'));
			}
		}
	});
</script>

<div class="h-screen w-full">
	<div class="flex items-center justify-center px-2 py-10">
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
				<form method="POST" id="signup-form" use:enhance novalidate>
					<div class="flex flex-col gap-6">
						<div class="grid gap-2">
							<Label for="email">Full name</Label>
							<Input
								id="full_name"
								type="text"
								placeholder="John doe"
								name="name"
								bind:value={$form.name}
								required
							/>
							{#if $errors.name}
								<span class="text-red-500"> {$errors.name} </span>
							{/if}
						</div>
						<div class="grid gap-2">
							<Label for="email">Email address</Label>
							<Input
								id="email"
								type="email"
								name="email"
								placeholder="example@gmail.com"
								bind:value={$form.email}
								required
							/>
							{#if $errors.email}
								<span class="text-red-500"> {$errors.email} </span>
							{/if}
						</div>
						<div class="grid gap-2">
							<Label for="email">Password</Label>
							<Input
								id="password"
								type="password"
								name="password"
								placeholder="Create a password"
								bind:value={$form.password}
								required
							/>
							{#if $errors.password}
								<span class="text-red-500">{$errors.password} </span>
							{/if}
						</div>
						<div class="grid gap-2">
							<Label for="email">Confirm password</Label>
							<Input
								id="confirm_password"
								type="password"
								name="confirm_password"
								placeholder="Confirm your password"
								bind:value={$form.confirm_password}
								required
							/>
							{#if $errors.password}
								<span class="text-red-500"> {$errors.confirm_password} </span>
							{/if}
						</div>
						<div class="grid gap-2">
							<div class="flex items-center gap-1 accent-black">
								<input type="checkbox" />
								<span> I agree to the</span>
								<a href="##" class=" inline-block text-sm underline underline-offset-4">
									Terms of Service
								</a>
							</div>
						</div>
					</div>
				</form>
			</Card.Content>
			<Card.Footer class="flex-col items-start gap-2">
				<Button form="signup-form" type="submit" class="w-full"
					>{$submitting ? 'Signing you up...' : 'Sign up'}</Button
				>
				<div class="float-left">
					<span class="text-sm text-gray-500">Already have an account? </span>
					<a href={resolve('/auth/login')} class="w-full">Sign-in</a>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
