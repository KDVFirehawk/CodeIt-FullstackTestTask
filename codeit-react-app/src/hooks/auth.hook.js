import { useState, useCallback, useEffect } from 'react';
import { useHttp } from '../hooks/http.hook';
import jwt_decode from 'jwt-decode';

const storageName = 'userData';
const timeOverExpires = 20 * 1000;

export const useAuthorization = () => {
	const { requestRefresh } = useHttp();

	const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
	const [accessToken, setAccessToken] = useState(null);
	const [user, setUser] = useState(null);
	const [ready, setReady] = useState(false);

	const isExpired = () => {
		try {
			const token = localStorage.getItem(storageName);
			const decodedToken = jwt_decode(token);
			if (decodedToken.exp * 1000 - Date.now() >= timeOverExpires) {
				return true;
			}
			return false;
		} catch (err) {
			return false;
		}
	};

	const isExistToken = () => {
		const token = localStorage.getItem(storageName);
		return !!token;
	};

	const login = useCallback((accessToken, user) => {
		setAccessToken(accessToken);
		setUser(user);
		setIsUserAuthenticated(true);

		localStorage.setItem(
			storageName,
			JSON.stringify({
				token: accessToken,
				user,
			}),
		);
	}, []);

	const logout = useCallback(() => {
		setIsUserAuthenticated(false);
		setAccessToken(null);
		setUser(null);
		localStorage.removeItem(storageName);
	}, []);

	const fetchRefreshToken = useCallback(async () => {
		async function fetchRefresh() {
			const data = await requestRefresh('/api/refresh', 'GET');
			return data;
		}
		const data = await fetchRefresh();
		if (data?.user && data?.accessToken) {
			login(data.accessToken, data.user);
			return;
		}
		return logout();
	}, [login, logout, requestRefresh]);

	useEffect(() => {
		if (isExistToken()) fetchRefreshToken();

		setReady(true);
	}, [fetchRefreshToken]);

	return {
		login,
		logout,
		ready,
		isUserAuthenticated,
		accessToken,
		user,
		isExpired,
		fetchRefreshToken,
	};
};
