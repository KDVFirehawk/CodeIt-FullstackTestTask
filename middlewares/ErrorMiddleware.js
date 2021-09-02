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

	const badRequest = res.status(400);
	const forbidden = res.status(403);
	const notFound = res.status(404);
	const internalServerError = res.status(500);

	const errorResponse = { Error: { Name: name, Message: message } };
	const serverErrorResponse = {
		Error: { Name: 'ServerError', Message: 'Something went wrong' },
	};

	console.log(stack);

	if (error instanceof NotFoundError) return notFound.json(errorResponse);
	if (error instanceof ValidationError) return badRequest.json(errorResponse);
	if (error instanceof AlreadyExistsError) return badRequest.json(errorResponse);
	if (error instanceof AuthorizationError) return forbidden.json(errorResponse);

	return internalServerError.json(serverErrorResponse);
}

export { errorHandlerMiddleware, errorHandler };
