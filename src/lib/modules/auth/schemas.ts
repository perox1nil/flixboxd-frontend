import { z } from 'zod';

export const registerSchema = z.object({
	name: z.string().min(1, { message: 'Please enter your name' }).max(500),
	email: z.string().email({ message: 'Please enter a valid email' }),
	password: z.string().min(8, { message: 'Password must be a minimum of 8 characters' })
});

export type RegisterSchema = typeof registerSchema;

export const loginSchema = z.object({
	email: z.string().email({ message: 'Please enter a valid email' }),
	password: z.string().min(8, { message: 'Password must be a minimum of 8 characters' })
});

export type LoginSchema = typeof loginSchema;
