<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
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
				<form>
					<div class="flex flex-col gap-6">
						<div class="grid gap-2">
							<Label for="email">Email address</Label>
							<Input id="email" type="email" placeholder="example@gmail.com" required />
						</div>
						<div class="grid gap-2">
							<Label for="email">Password</Label>
							<Input id="password" type="password" placeholder="Enter your password" required />
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
				<Button type="submit" class="w-full">Login</Button>
				<Button variant="outline" class="w-full">Login with Google</Button>
			</Card.Footer>
		</Card.Root>
	</div>
</div>
