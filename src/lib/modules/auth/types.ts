export type RegisterInput = {
	name: string;
	email: string;
	password: string;
};

export type LoginInput = {
	email: string;
	password: string;
};

export type LoginResponse = {
	token: {
		token: string;
		expiry: Date;
	};
};
