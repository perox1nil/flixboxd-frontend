<script lang="ts">
	import { goto } from '$app/navigation';
	import Button from '$lib/components/ui/button/button.svelte';
	import { deleteMovie, getMovies } from '$lib/modules/movies';
	import { CreateMovieForm } from '$lib/modules/movies/create-movie';
	import { createMutation, createQuery, getQueryClientContext } from '@tanstack/svelte-query';
	import toast from 'svelte-french-toast';

	const queryClient = getQueryClientContext();

	const query = createQuery({
		queryKey: ['movies'],
		queryFn: getMovies
	});

	const deleteMutation = createMutation({
		mutationKey: ['movies'],
		mutationFn: deleteMovie,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['movies'] });
			toast.success('Deleted successfully!');
		}
	});
</script>

<div class="mt-10 w-full p-3">
	<CreateMovieForm />
</div>

<div class="mt-20 flex flex-col gap-3 p-3">
	{#if $query.isPending}
		Loading...
	{/if}
	{#if $query.error}
		An error has occurred:
		{$query.error.message}
	{/if}
	{#if $query.data?.data.movies.length < 1}
		Empty movies
	{/if}
	{#if $query.data?.data.movies}
		{#each $query.data.data.movies as movie}
			<div class="flex flex-row items-center justify-between border p-3">
				<div>
					<p>Title: {movie.title}</p>
					<p>Year: {movie.year}</p>
					<p>Runtime: {movie.runtime}</p>
					<p>Genres: {movie.genres}</p>
				</div>
				<div>
					<Button onclick={() => goto(`/movies/${movie.id}`)}>View Movie</Button>
					<Button onclick={() => $deleteMutation.mutate(movie.id)}>Delete</Button>
				</div>
			</div>
		{/each}
	{/if}
</div>
