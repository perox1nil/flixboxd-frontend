import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ parent }) => {
	const { user } = await parent();

	if (!user) {
		redirect(303, '/login');
	}

	if (!user.activated) {
		redirect(303, '/u/email-confirmation');
	}
};
