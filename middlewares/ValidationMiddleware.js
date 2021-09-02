import ValidationHelper from '../helpers/ValidationHelper.js';

class ValidationMiddleware {
	async registerValidation(req, res, next) {
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
	}
	async authorizeValidation(req, res, next) {
		const { emailOrLogin, password } = req.body;

		ValidationHelper.loginAllFieldsValidation({
			emailOrLogin,
			password,
		});
		return next();
	}
	async loginOrEmailValidation(req, res, next) {
		const { emailOrLogin } = req.params;

		ValidationHelper.loginValidation(emailOrLogin);
		return next();
	}
}

export default new ValidationMiddleware();
