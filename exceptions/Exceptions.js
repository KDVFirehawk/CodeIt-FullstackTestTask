class NotFoundError extends Error {
	#defaultMessage = 'Object was not found';
	#defaultName = 'NotFoundError';
	constructor(message) {
		super(message);
		this.message = message ?? this.#defaultMessage;
		this.name = this.#defaultName;
	}
}
class ValidationError extends Error {
	#defaultMessage = 'Some fields were not validated';
	#defaultName = 'ValidationError';
	constructor(message) {
		super(message);
		this.message = message ?? this.#defaultMessage;
		this.name = this.#defaultName;
	}
}
class AlreadyExistsError extends Error {
	#defaultMessage = 'Adding object error: object already exists!';
	#defaultName = 'AlreadyExistsError';
	constructor(message) {
		super(message);
		this.message = message ?? this.#defaultMessage;
		this.name = this.#defaultName;
	}
}
class AuthorizationError extends Error {
	#defaultMessage = 'Authorization error: wrong email/login or password!';
	#defaultName = 'AuthorizationError';
	constructor(message) {
		super(message);
		this.message = message ?? this.#defaultMessage;
		this.name = this.#defaultName;
	}
}

export { NotFoundError, ValidationError, AlreadyExistsError, AuthorizationError };
