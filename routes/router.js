import Router from 'express';
import AuthController from '../controllers/AuthController.js';
import ValidationMiddleware from '../middlewares/ValidationMiddleware.js';
import UserController from '../controllers/UserController.js';
import CountryController from '../controllers/CountryController.js';
import { errorHandler } from '../middlewares/ErrorMiddleware.js';

const router = new Router();

/**
 * I don't use trycatch becouse
 * all errors processed in { errorHandler } from ../middlewares/ErrorMiddleware.js
 */
router.post(
	'/register',
	ValidationMiddleware.registerValidation,
	errorHandler(AuthController.register),
);
router.get('/users', errorHandler(UserController.getUsers));
router.get(
	'/user/:emailOrLogin',
	errorHandler(ValidationMiddleware.loginOrEmailValidation),
	errorHandler(UserController.getUser),
);
router.post(
	'/login',
	errorHandler(ValidationMiddleware.authorizeValidation),
	errorHandler(AuthController.login),
);
router.post('/logout/:id', errorHandler(AuthController.logout));
router.get('/countries', errorHandler(CountryController.getCountries));

export default router;
