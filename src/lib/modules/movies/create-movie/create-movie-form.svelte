<script lang="ts">
	import * as Form from '$lib/components/ui/form';
	import { Input } from '$lib/components/ui/input';
	import { defaults, superForm } from 'sveltekit-superforms';
	import { createMovie, movieSchema } from '..';
	import { zod } from 'sveltekit-superforms/adapters';
	import { createMutation, getQueryClientContext } from '@tanstack/svelte-query';
	import toast from 'svelte-french-toast';
	import { Checkbox } from '$lib/components/ui/checkbox';

	const queryClient = getQueryClientContext();

	const genres = [
		{
			id: 'test',
			label: 'test'
		},
		{
			id: 'drama',
			label: 'drama'
		}
	];

	const createMovieMutation = createMutation({
		mutationKey: ['movies'],
		mutationFn: createMovie,
		onSuccess: () => {
			toast.success('Movie created successfully');
			queryClient.invalidateQueries({ queryKey: ['movies'] });
		}
	});

	const form = superForm(defaults(zod(movieSchema)), {
		SPA: true,
		validators: zod(movieSchema),
		onUpdate({ form }) {
			if (form.valid) {
				$createMovieMutation.mutate(form.data);
			}
		}
	});

	const { form: formData, enhance } = form;

	const addItem = (id: string) => {
		$formData.genres = [...$formData.genres, id];
	};

	const removeItem = (id: string) => {
		$formData.genres.filter((genre) => genre !== id);
	};
</script>

<form class="min-w-96 p-3" method="POST" use:enhance>
	<div class="text-center">
		<h1 class="text-4xl font-bold">Create Movie</h1>
	</div>
	<Form.Field {form} name="title">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Title</Form.Label>
				<Input {...props} bind:value={$formData.title} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="year">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Year</Form.Label>
				<Input type="number" {...props} bind:value={$formData.year} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Field {form} name="runtime">
		<Form.Control>
			{#snippet children({ props })}
				<Form.Label>Runtime</Form.Label>
				<Input type="number" {...props} bind:value={$formData.runtime} />
			{/snippet}
		</Form.Control>
		<Form.FieldErrors />
	</Form.Field>
	<Form.Fieldset {form} name="genres">
		{#each genres as genre}
			{@const checked = $formData.genres.includes(genre.id)}
			<Form.Control>
				{#snippet children({ props })}
					<Checkbox
						{...props}
						{checked}
						value={genre.id}
						onCheckedChange={(v) => {
							if (v) {
								addItem(genre.id);
							} else {
								removeItem(genre.id);
							}
						}}
					/>
					<Form.Label class="font-normal">
						{genre.label}
					</Form.Label>
				{/snippet}
			</Form.Control>
		{/each}
		<Form.FieldErrors />
	</Form.Fieldset>
	<div class="mt-5 text-center">
		<Form.Button class="w-full">Submit</Form.Button>
	</div>
</form>
