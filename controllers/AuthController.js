import UserDBService from '../services/UserDBService.js';
import TokenDBService from '../services/TokenDBService.js';
import SignTokenHelper from '../helpers/SignTokenHelper.js';
import { AlreadyExistsError } from '../exceptions/Exceptions.js';

class AuthController {
	async register(req, res) {
		const { email, login, name, password, birthDate, country } = req.body;

		const isUserAlreadyExists = await UserDBService.isUserAlreadyExists(email, login);
		if (isUserAlreadyExists) throw new AlreadyExistsError('User already exists!');

		await UserDBService.addUser({
			email,
			login,
			name,
			password,
			birthDate,
			country,
		});

		const { accessToken, refreshToken } = await SignTokenHelper.newAccessRefresh({
			email,
			login,
			name,
			country,
			birthDate,
		});

		const createdUser = await UserDBService.getUser(email);

		await TokenDBService.newRefreshToken(createdUser.userId, refreshToken);

		return res.json({
			user: createdUser,
			accessToken,
			refreshToken,
		});
	}

	async login(req, res) {
		const { emailOrLogin, password } = req.body;

		await UserDBService.compareUserPassword(emailOrLogin, password);

		const user = await UserDBService.getUser(emailOrLogin);

		const { accessToken, refreshToken } = await SignTokenHelper.newAccessRefresh({
			email: user.email,
			login: user.login,
			name: user.name,
			country: user.country,
		});

		await TokenDBService.updateRefreshToken(user.userId, refreshToken);

		const userSafeInfo = await UserDBService.getUser(user.email);

		return res.json({
			user: userSafeInfo,
			accessToken,
			refreshToken,
		});
	}

	async logout(req, res) {
		const { id } = req.params;

		await TokenDBService.getRefreshToken(id);
		await TokenDBService.updateRefreshToken(id, null);
		res.status(200).end();
	}
}

export default new AuthController();
