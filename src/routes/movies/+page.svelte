<script lang="ts">
	import { getMovies } from '$lib/modules/movies';
	import { CreateMovieForm } from '$lib/modules/movies/create-movie';
	import { createQuery } from '@tanstack/svelte-query';

	const query = createQuery({
		queryKey: ['movies'],
		queryFn: getMovies
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
			<div class="border p-3">
				<p>Title: {movie.title}</p>
				<p>Year: {movie.year}</p>
				<p>Runtime: {movie.runtime}</p>
				<p>Genres: {movie.genres}</p>
			</div>
		{/each}
	{/if}
</div>
