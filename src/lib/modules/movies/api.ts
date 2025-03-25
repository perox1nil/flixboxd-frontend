import api from '$lib/api/axios';
import type { MovieSchema, UpdateMovieParams } from '.';

// - QUERIES -
export const getMovies = async () => {
	return await api.get('/movies');
};

export const getMovieByID = async (movieID: number) => {
	return await api.get(`/movies/${movieID}`);
};

// - MUTATIONS -

export const createMovie = async (data: MovieSchema) => {
	return await api.post('/movies', JSON.stringify({ ...data, runtime: `${data.runtime} mins` }));
};

export const updateMovie = async ({ movieID, data }: UpdateMovieParams) => {
	return await api.patch(
		`/movies/${movieID}`,
		JSON.stringify({ ...data, runtime: `${data.runtime} mins` })
	);
};

export const deleteMovie = async (movieId: number) => {
	return await api.delete(`movies/${movieId}`);
};
