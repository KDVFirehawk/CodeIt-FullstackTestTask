import bcryptjs from 'bcryptjs';
import config from '../config.js';
import sqlPool from '../database/mySqlConnection.js';
import ValidationHelper from '../helpers/ValidationHelper.js';
import UserExceptions from '../exceptions/UserExceptions.js';
import printError from '../helpers/PrintError.js';

class UserDBService {
	async addUser(user) {
		try {
			const registerDate = Date.now();
			const hashedPassword = bcryptjs.hashSync(user.password, config.app.bcryptSalt);

			const values = `'${user.email}','${user.login}','${user.name}','${hashedPassword}',
			'${user.birthDate}','${user.country}',${registerDate}`;

			await sqlPool.execute(
				`INSERT user(email,login,name,password,birthdate,country,registerdate) ` +
					`VALUES (${values})`,
			);
		} catch (e) {
			printError(e, 'UserDBService addUser');
			throw e;
		}
	}
	async getAllUsersFullInfo() {
		try {
			const users = await sqlPool.execute('SELECT * FROM user');
			if (!users[0].length) throw UserExceptions.userNotFound();

			return users[0];
		} catch (e) {
			printError(e, 'UserDBService getAllUsersFullInfo');
			throw e;
		}
	}
	async getAllUsersSafeInfo() {
		try {
			const allUsersRaw = await this.getAllUsersFullInfo();
			if (!allUsersRaw) throw UserExceptions.userNotFound();

			const allUsersSafe = allUsersRaw.map((user) => {
				return this.convertUserToSafeInfo(user);
			});
			return allUsersSafe;
		} catch (e) {
			printError(e, 'UserDBService getAllUsersSafeInfo');
			throw e;
		}
	}
	/**
	 * @param {string} emailOrLogin
	 * @returns {object} user
	 *
	 * Function gets user email or login, then checks is it email or login?
	 * Then finds user in DB => returns object than contains user object
	 */
	async getUserFullInfo(emailOrLogin) {
		try {
			if (emailOrLogin.length < 5) UserExceptions.userValidation();

			const whereEmailOrLogin = ValidationHelper.emailValidation(emailOrLogin)
				? 'email'
				: 'login';

			const user = await sqlPool.execute(
				`SELECT * FROM user WHERE ${whereEmailOrLogin} = '${emailOrLogin}'`,
			);
			if (!user[0].length) UserExceptions.userNotFound();

			return user[0][0];
		} catch (e) {
			printError(e, 'UserDBService getUserFullInfo');
			throw e;
		}
	}
	async getUserSafeInfo(emailOrLogin) {
		try {
			const userFullInfo = await this.getUserFullInfo(emailOrLogin);

			const userSafeInfo = this.convertUserToSafeInfo(userFullInfo);

			return userSafeInfo;
		} catch (e) {
			printError(e, 'UserDBService getUserSafeInfo');
			throw e;
		}
	}
	async isUserAlreadyExists(email, login) {
		try {
			const user = await sqlPool.execute(
				`SELECT * FROM user WHERE email = '${email}' AND login = '${login}'`,
			);
			if (!user[0].length) return false;

			const safeUser = this.convertUserToSafeInfo(user[0][0]);
			return safeUser;
		} catch (e) {
			printError(e, 'UserDBService isUserAlreadyExists');
			throw e;
		}
	}
	convertUserToSafeInfo(user) {
		try {
			return {
				userId: user.userId,
				email: user.email,
				login: user.login,
				name: user.name,
				country: user.country,
			};
		} catch (e) {
			printError(e, 'UserDBService convertUserToSafeInfo');
			throw e;
		}
	}
}

export default new UserDBService();
