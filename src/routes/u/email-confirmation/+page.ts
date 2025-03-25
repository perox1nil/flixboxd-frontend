import type { PageLoad } from './$types';
import { goto } from '$app/navigation';

export const load: PageLoad = async ({ parent }) => {
	const { user } = await parent();

	if (!user) {
		goto('/login');
	}

	if (user?.activated) {
		goto('/');
	}
};
