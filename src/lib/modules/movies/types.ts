export type Movie = {
	id: number;
	title: string;
	year: number;
	runtime: number;
	genres: Array<string>;
	version: number;
};

export type MovieResponse = {
	movie: Movie;
};
