import type { Infer } from 'sveltekit-superforms';
import { z } from 'zod';

export const movieSchema = z.object({
	title: z.string().min(1, { message: 'Please enter a movie title' }),
	year: z
		.number()
		.min(1888, { message: 'Year must be greater than year 1888' })
		.max(new Date().getFullYear(), { message: 'Year must not be in the future' }),
	runtime: z.number().min(1, { message: 'Please enter a runtime' }),
	genres: z
		.array(z.string())
		.refine((value) => value.some((item) => item), { message: 'Please provide genre/s' })
});

export type MovieSchema = Infer<typeof movieSchema>;
