import UserExceptions from '../exceptions/UserExceptions.js';

class ValidationHelper {
	registerAllFieldsValidation(body) {
		this.emailValidation(body.email);
		this.loginValidation(body.login);
		this.nameValidation(body.name);
		this.passwordValidation(body.password);
		this.birthValidation(body.birthDate);
		this.countryValidation(body.country);
	}

	loginAllFieldsValidation(body) {
		this.loginValidation(body.emailOrLogin);
		this.passwordValidation(body.password);
	}

	emailValidation(email) {
		const regularExpression = /^\w+@[a-zA-Z]+\.[a-zA-Z]+$/;
		if (!regularExpression.test(email)) throw UserExceptions.userValidation('email');
		return true;
	}
	loginValidation(login) {
		if (login.length < 5) throw UserExceptions.userValidation('login');
		return true;
	}
	nameValidation(name) {
		if (name.length < 5) throw UserExceptions.userValidation('name');
		return true;
	}
	passwordValidation(password) {
		if (password.length < 5) throw UserExceptions.userValidation('password');
		return true;
	}
	birthValidation(birthDate) {
		const regularExpression = /^\d\d\.\d\d\.\d\d\d\d$/;
		if (!regularExpression.test(birthDate)) throw UserExceptions.userValidation('birthDate');
		return true;
	}
	countryValidation(country) {
		if (country.length < 3) throw UserExceptions.userValidation('country');
		return true;
	}
}

export default new ValidationHelper();
