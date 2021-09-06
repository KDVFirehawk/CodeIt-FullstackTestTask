import { useState, useCallback, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export const useHttp = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const { accessToken, isExpired, fetchRefreshToken } = useContext(AuthContext);

	const request = useCallback(
		async (url, method = 'GET', body = null, headers = {}) => {
			setLoading(true);
			try {
				if (!accessToken || !isExpired()) {
					await fetchRefreshToken();
				}

				if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

				if (body) {
					body = JSON.stringify(body);
					headers['Content-Type'] = 'application/json';
				}

				const response = await fetch(url, { method, body, headers });

				if (!(response.headers.get('content-length') * 1)) {
					setLoading(false);
					return { hasErrors: !response.ok };
				}
				const data = await response.json();
				setLoading(false);
				data.hasErrors = !response.ok;

				return data;
			} catch (e) {
				const error = e.message;
				setLoading(false);
				if (!error.includes('Unexpected token')) {
					setError(e.message);
					throw e;
				}
				setError('Something went wrong!');
			}
		},
		[accessToken, isExpired, fetchRefreshToken],
	);

	const requestRefresh = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
		setLoading(true);
		try {
			const response = await fetch(url, { method, body, headers });

			if (!(response.headers.get('content-length') * 1)) {
				setLoading(false);
				return { hasErrors: !response.ok };
			}
			const data = await response.json();
			setLoading(false);
			data.hasErrors = !response.ok;

			return data;
		} catch (e) {
			const error = e.message;
			setLoading(false);
			if (!error.includes('Unexpected token')) {
				setError(e.message);
				throw e;
			}
			setError('Something went wrong!');
		}
	}, []);

	const clearError = useCallback(() => setError(null), []);

	return { loading, request, requestRefresh, error, clearError };
};
