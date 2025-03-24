export type User = {
	id: number;
	created_at: Date;
	name: string;
	email: string;
	activated: true;
};

export type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

export type LoginInput = {
	email: string;
	password: string;
};

export type ConfirmInput = {
	token: string;
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
