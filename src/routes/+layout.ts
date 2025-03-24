import api from '$lib/api/axios';
import type { User } from '$lib/modules/auth';
import type { LayoutLoad } from './$types';

export const ssr = false;

export const load: LayoutLoad = async () => {
	const token = sessionStorage.getItem('token');

	if (!token) {
		return;
	}

	const response = await api.get('/users/authenticated');

	if (response.status === 401) {
		sessionStorage.removeItem('token');
		return;
	}

	const user = response.data.user as User;

	return { user };
};
