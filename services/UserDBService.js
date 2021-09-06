import bcryptjs from 'bcryptjs';
import config from '../config.js';
import sqlPool from '../database/mySqlConnection.js';
import { NotFoundError, AuthorizationError } from '../exceptions/Exceptions.js';

class UserDBService {
	async addUser(user) {
		const registerDate = Date.now();
		const hashedPassword = bcryptjs.hashSync(user.password, config.app.bcryptSalt);

		const values = `'${user.email}','${user.login}','${user.name}','${hashedPassword}',
		'${user.birthDate}','${user.country}',${registerDate}`;

		await sqlPool.execute(
			`INSERT user(email,login,name,password,birthdate,country,registerdate) ` +
				`VALUES (${values})`,
		);
	}

	async getAllUsers() {
		const usersRaw = await sqlPool.execute('SELECT * FROM user');
		if (!usersRaw[0].length) throw new NotFoundError('Users not found');

		const usersProcessed = usersRaw[0].map((user) => {
			return this.convertUserInfoToSafe(user);
		});
		return usersProcessed;
	}

	/**
	 * @param {string} emailOrLogin
	 * @returns {object} user
	 *
	 * Function gets user email or login, then checks is it email or login?
	 * Then finds user in DB => returns object than contains user object
	 */
	async getUser(emailOrLogin) {
		const userRaw = await sqlPool.execute(
			`SELECT * FROM user WHERE email = '${emailOrLogin}' OR login ='${emailOrLogin}'`,
		);
		if (!userRaw[0].length) throw new NotFoundError('User not found');

		const userSafeInfo = this.convertUserInfoToSafe(userRaw[0][0]);
		return userSafeInfo;
	}

	async isUserAlreadyExists(email, login) {
		try {
			await this.getUser(email);
			await this.getUser(login);

			return true;
		} catch (e) {
			if (e instanceof NotFoundError) return false;
		}
	}

	async compareUserPassword(emailOrLogin, password) {
		const userRaw = await sqlPool.execute(
			`SELECT * FROM user WHERE email = '${emailOrLogin}' OR login ='${emailOrLogin}'`,
		);
		if (!userRaw[0].length) throw new AuthorizationError();

		const checkPassword = await bcryptjs.compare(password, userRaw[0][0].password);
		if (!checkPassword) throw new AuthorizationError();
	}

	convertUserInfoToSafe(user) {
		return {
			userId: user.userId,
			email: user.email,
			login: user.login,
			name: user.name,
			country: user.country,
			birthDate: user.birthdate,
		};
	}
}

export default new UserDBService();
