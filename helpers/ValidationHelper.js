import { ValidationError } from '../exceptions/Exceptions.js';

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
		if (!regularExpression.test(email)) throw new ValidationError('Email were not validated');
		return true;
	}
	loginValidation(login) {
		if (login.length < 5) throw new ValidationError('Login must have minimum 5 characters');
		return true;
	}
	nameValidation(name) {
		if (name.length < 5) throw new ValidationError('Name must have minimum 5 characters');
		return true;
	}
	passwordValidation(password) {
		if (password.length < 5)
			throw new ValidationError('Password must have minimum 5 characters');
		return true;
	}
	birthValidation(birthDate) {
		const regularExpression = /^\d\d\.\d\d\.\d\d\d\d$/;
		if (!regularExpression.test(birthDate))
			throw new ValidationError('Date of birth must be like dd.mm.yyyy');
		return true;
	}
	countryValidation(country) {
		if (country.length < 3) throw new ValidationError('Country must have minimum 3 characters');
		return true;
	}
}

export default new ValidationHelper();
