class UserExceptions extends Error {
	userNotFound(message) {
		throw {
			type: 'user404',
			name: 'User not found',
			message: message || 'Database search error: user/users not found',
		};
	}
	userValidation(fields) {
		throw {
			type: 'user400',
			name: 'User validation error',
			message: `Fields [${fields}] have not been validated`,
		};
	}
}

export default new UserExceptions();
