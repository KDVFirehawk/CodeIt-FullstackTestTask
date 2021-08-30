import ValidationHelper from '../helpers/ValidationHelper.js';
import printError from '../helpers/PrintError.js';

class ValidationMiddleware {
	async registerValidation(req, res, next) {
		try {
			const { email, login, name, password, birthDate, country } = req.body;

			ValidationHelper.registerAllFieldsValidation({
				email,
				login,
				name,
				password,
				birthDate,
				country,
			});
			return next();
		} catch (e) {
			printError(e, 'ValidationMiddleware registerValidation');

			return res
				.status(422)
				.json({ Error: 'Validation error, fill all inputs with right data' });
		}
	}
	async loginValidation(req, res, next) {
		try {
			const { emailOrLogin, password } = req.body;

			ValidationHelper.loginAllFieldsValidation({
				emailOrLogin,
				password,
			});
			return next();
		} catch (e) {
			printError(e, 'ValidationMiddleware loginValidation');

			return res
				.status(422)
				.json({ Error: 'Validation error, fill all inputs with right data' });
		}
	}
}

export default new ValidationMiddleware();
