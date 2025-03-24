import type { Infer } from 'sveltekit-superforms';
import { z } from 'zod';

export const registerSchema = z.object({
	name: z.string().min(1, { message: 'Please enter your name' }).max(500),
	email: z.string().email({ message: 'Please enter a valid email' }),
	password: z.string().min(8, { message: 'Password must be a minimum of 8 characters' })
});

export type RegisterSchema = Infer<typeof registerSchema>;

export const loginSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
	password: z.string().min(8, { message: 'Password must be a minimum of 8 characters' })
});

export type LoginSchema = Infer<typeof loginSchema>;

export const confirmSchema = z.object({
	token: z.string().min(1, { message: 'Please enter a confirmation token' })
});

export type ConfirmSchema = Infer<typeof confirmSchema>;
