export type User = {
	id: number;
	created_at: Date;
	name: string;
	email: string;
	activated: true;
};

export type LoginResponse = {
	token: {
		token: string;
		expiry: Date;
	};
};

export type AuthenticatedUserResponse = {
	user: User;
};
