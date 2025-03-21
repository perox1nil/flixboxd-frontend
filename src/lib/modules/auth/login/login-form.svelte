<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { loginSchema } from '..';
	import { zod } from 'sveltekit-superforms/adapters';

	const form = superForm(defaults(zod(loginSchema)), {
		SPA: true,
		validators: zod(loginSchema),
		onUpdate({ form }) {
			if (form.valid) {
				// TODO: IMPLEMENT API CALL HERE BRO
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form class="min-w-96 p-3" method="POST" use:enhance>
	<div class="text-center">
		<h1 class="text-4xl font-bold">Login</h1>
	</div>
	<Form.Field {form} name="email">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Email</Form.Label>
				<Input type="email" {...props} bind:value={$formData.email} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="password">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Password</Form.Label>
				<Input type="password" {...props} bind:value={$formData.password} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="mt-5 text-center">
		<Form.Button class="w-full">Submit</Form.Button>
		<p class="mt-2">
			Don't have account? <a class="text-primary hover:text-secondary" href="/register">Register</a>
			here
		</p>
	</div>
</form>
