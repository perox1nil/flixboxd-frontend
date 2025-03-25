import api from '$lib/api/axios';
import type { MovieSchema } from '.';

// - QUERIES -
export const getMovies = async () => {
	return await api.get('/movies');
};

// - MUTATIONS -

export const createMovie = async (data: MovieSchema) => {
	return await api.post('/movies', JSON.stringify({ ...data, runtime: `${data.runtime} mins` }));
};

export const updateMovie = async (movieId: number, data: MovieSchema) => {
	return await api.patch(`/movies/${movieId}`, JSON.stringify(data));
};

export const deleteMovie = async (movieId: number) => {
	return await api.delete(`movies/${movieId}`);
};
