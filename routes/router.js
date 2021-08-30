import Router from 'express';
import AuthController from '../controllers/AuthController.js';
import ValidationMiddleware from '../middlewares/ValidationMiddleware.js';
import UserController from '../controllers/UserController.js';

const router = new Router();

router.post('/register', ValidationMiddleware.registerValidation, AuthController.register);
router.get('/users', UserController.getUsers);
router.get('/user/:emailOrLogin', UserController.getUser);
router.post('/login', ValidationMiddleware.loginValidation, AuthController.login);
router.delete('/logout/:id', AuthController.logout);

export default router;
