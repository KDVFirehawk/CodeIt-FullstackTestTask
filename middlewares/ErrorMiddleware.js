import {
	NotFoundError,
	ValidationError,
	AlreadyExistsError,
	AuthorizationError,
} from '../exceptions/Exceptions.js';

const errorHandler = (func) => (req, res, next) =>
	Promise.resolve(func(req, res, next)).catch(next);

function errorHandlerMiddleware(error, req, res, next) {
	const { stack, name, message } = error;

	const errorResponse = { Error: { name, message } };
	const serverErrorResponse = {
		Error: { name: 'ServerError', message: 'Something went wrong' },
	};

	console.log(stack);

	if (error.name === 'JsonWebTokenError') return res.status(403).json(errorResponse);
	if (error.name === 'TokenExpiredError') return res.status(403).json(errorResponse);
	if (error instanceof NotFoundError) return res.status(404).json(errorResponse);
	if (error instanceof ValidationError) return res.status(400).json(errorResponse);
	if (error instanceof AlreadyExistsError) return res.status(400).json(errorResponse);
	if (error instanceof AuthorizationError) return res.status(403).json(errorResponse);

	return res.status(500).json(serverErrorResponse);
}

export { errorHandlerMiddleware, errorHandler };
