class ValidationHelper {
	registerAllFieldsValidation(body) {
		const result = [];
		result.push(this.emailValidation(body.email));
		result.push(this.loginValidation(body.login));
		result.push(this.nameValidation(body.name));
		result.push(this.passwordValidation(body.password));
		result.push(this.birthValidation(body.birthDate));
		result.push(this.countryValidation(body.country));
		return result;
	}

	loginAllFieldsValidation(body) {
		const result = [];
		result.push(this.loginValidation(body.emailOrLogin));
		result.push(this.passwordValidation(body.password));
		return result;
	}

	emailValidation(email) {
		const regularExpression = /^\w+@[a-zA-Z]+\.[a-zA-Z]+$/;
		if (!regularExpression.test(email)) {
			return 'Incorrect email entered';
		}
		return true;
	}
	loginValidation(login) {
		if (login.length < 5) {
			return 'Login must have minimum 5 characters';
		}
		return true;
	}
	nameValidation(name) {
		if (name.length < 5) {
			return 'Name must have minimum 5 characters';
		}
		return true;
	}
	passwordValidation(password) {
		if (password.length < 5) {
			return 'Password must have minimum 5 characters';
		}
		return true;
	}
	birthValidation(birthDate) {
		const regularExpression = /^\d\d\.\d\d\.\d\d\d\d$/;
		if (!regularExpression.test(birthDate)) {
			return 'Date of birth must be like dd.mm.yyyy';
		}
		return true;
	}
	countryValidation(country) {
		if (country.length < 3) {
			return 'Country must have minimum 3 characters';
		}
		return true;
	}
}

export default new ValidationHelper();
