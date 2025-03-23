import { redirect } from '@sveltejs/kit';
import type { PageLoad } from '../../(auth)/register/$types';

export const load: PageLoad = () => {
	const token = sessionStorage.getItem('token');

	if (!token) {
		return redirect(303, '/login');
	}
};
