class TokenExceptions {
	tokenNotFound(message) {
		throw {
			type: 'token404',
			name: 'Token not found',
			message: message || 'Database search error: token not found',
		};
	}
}

export default new TokenExceptions();
