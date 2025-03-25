import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import { getMovieByID, type MovieResponse } from '$lib/modules/movies';

export const load: PageLoad = async ({ params }) => {
	if (!parseInt(params.id)) {
		error(400, 'Invalid ID');
	}

	const response = await getMovieByID(parseInt(params.id));

	if (response.status === 404) {
		error(404, 'Item not found :(');
	}

	const data = response.data as MovieResponse;

	return { movie: data };
};
