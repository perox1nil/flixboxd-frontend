import api from '$lib/api/axios';
import type { ConfirmSchema, LoginSchema, RegisterSchema } from '.';

// - QUERIES -
export const authenticatedUser = async () => {
	return await api.get('/users/authenticated');
};

// - MUTATIONS -
export const register = async (data: RegisterSchema) => {
	return await api.post('/users', JSON.stringify(data));
};

export const login = async (data: LoginSchema) => {
	return await api.post('/tokens/authentication', JSON.stringify(data));
};

export const confirmEmail = async (data: ConfirmSchema) => {
	return await api.put('/users/activated', JSON.stringify(data));
};
