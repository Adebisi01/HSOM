<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
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
				<form method="POST">
					<div class="flex flex-col gap-6">
						<div class="grid gap-2">
							<Label for="email">Full name</Label>
							<Input id="full_name" type="text" placeholder="John doe" required />
						</div>
						<div class="grid gap-2">
							<Label for="email">Email address</Label>
							<Input id="email" type="email" placeholder="example@gmail.com" required />
						</div>
						<div class="grid gap-2">
							<Label for="email">Password</Label>
							<Input id="password" type="password" placeholder="Create a password" required />
						</div>
						<div class="grid gap-2">
							<Label for="email">Confirm password</Label>
							<Input
								id="confirm_password"
								type="password"
								placeholder="Confirm your password"
								required
							/>
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
				<Button type="submit" class="w-full">Sign up</Button>
				<div class="float-left">
					<span class="text-sm text-gray-500">Already have an account? </span>
					<a href="#" class="w-full">Sign-in</a>
				</div>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
