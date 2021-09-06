import { createContext } from 'react';

function empty() {}

export const AuthContext = createContext({
	isUserAuthenticated: false,

	accessToken: null,

	user: null,

	login: empty,
	logout: empty,
	fetchRefreshToken: empty,
});
