<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { zod } from 'sveltekit-superforms/adapters';
	import { createMutation } from '@tanstack/svelte-query';
	import toast from 'svelte-french-toast';
	import api, { type APIErrorResponse } from '$lib/api/axios';
	import type { AxiosError } from 'axios';
	import { confirmSchema, type ConfirmInput, type LoginResponse } from '..';

	const confirmMutation = createMutation({
		mutationKey: ['email-confirmation'],
		mutationFn: async (user: ConfirmInput) =>
			await api.post('/tokens/authentication', {
				token: user.token
			}),
		onSuccess: (e) => {
			const loginResponse = e.data as LoginResponse;
			sessionStorage.setItem('token', loginResponse.token.token);
			toast.success('Logged in successfully!', { duration: 4000 });
		},
		onError: (e: AxiosError<APIErrorResponse>) => {
			if (e.status === 401) {
				toast.error(e.response?.data.error);
			}
		}
	});

	const form = superForm(defaults(zod(confirmSchema)), {
		SPA: true,
		validators: zod(confirmSchema),
		onUpdate({ form }) {
			if (form.valid) {
				$confirmMutation.mutate({
					token: form.data.token
				});
			}
		}
	});

	const { form: formData, enhance } = form;
</script>

<form class="min-w-96 p-3" method="POST" use:enhance>
	<div class="text-center">
		<h1 class="text-4xl font-bold">Confirm Email</h1>
	</div>
	<Form.Field {form} name="token">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Token</Form.Label>
				<Input type="email" {...props} bind:value={$formData.token} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<div class="mt-5 text-center">
		<Form.Button class="w-full">Submit</Form.Button>
	</div>
</form>
