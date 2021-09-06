import UserDBService from '../services/UserDBService.js';
import TokenDBService from '../services/TokenDBService.js';
import TokenHelper from '../helpers/TokenHelper.js';
import { AlreadyExistsError } from '../exceptions/Exceptions.js';
import config from '../config.js';

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

		const { accessToken, refreshToken } = await TokenHelper.newAccessRefresh({
			email,
			login,
			name,
			country,
			birthDate,
		});

		const createdUser = await UserDBService.getUser(email);

		await TokenDBService.addRefreshTokenToDB(createdUser.userId, refreshToken);

		res.cookie('refreshToken', refreshToken, config.cookieRefreshToken);

		return res.json({
			user: createdUser,
			accessToken,
		});
	}

	async login(req, res) {
		const { emailOrLogin, password } = req.body;

		await UserDBService.compareUserPassword(emailOrLogin, password);

		const user = await UserDBService.getUser(emailOrLogin);

		const { accessToken, refreshToken } = await TokenHelper.newAccessRefresh({
			userId: user.userId,
			email: user.email,
			login: user.login,
			name: user.name,
			country: user.country,
		});

		await TokenDBService.updateRefreshToken(user.userId, refreshToken);

		const userSafeInfo = await UserDBService.getUser(user.email);

		res.cookie('refreshToken', refreshToken, config.cookieRefreshToken);

		return res.json({
			user: userSafeInfo,
			accessToken,
		});
	}

	async logout(req, res) {
		const { userId } = req.body;

		/**
		 * Get refresh token used for check is token exists?
		 * If token does not exist => get error NotFoundError
		 * If no errors occured => token updates
		 */
		await TokenDBService.getRefreshToken(userId);
		await TokenDBService.updateRefreshToken(userId, null);
		res.status(200).end();
	}

	async refresh(req, res) {
		const { refreshToken } = req.cookies;

		const decodedRefreshToken = await TokenHelper.validateToken(refreshToken);
		const refreshTokenFromDB = await TokenDBService.getRefreshToken(decodedRefreshToken.userId);
		if (refreshToken !== refreshTokenFromDB)
			return res.status(403).json({ Error: { name: 'JsonWebTokenError' } });

		const userSafeInfo = await UserDBService.getUser(decodedRefreshToken.email);

		const { accessToken, refreshToken: newRefreshToken } = await TokenHelper.newAccessRefresh({
			userId: userSafeInfo.userId,
			email: userSafeInfo.email,
			login: userSafeInfo.login,
			name: userSafeInfo.name,
			country: userSafeInfo.country,
		});
		await TokenDBService.updateRefreshToken(userSafeInfo.userId, newRefreshToken);

		res.cookie('refreshToken', newRefreshToken, config.cookieRefreshToken);
		return res.json({
			user: userSafeInfo,
			accessToken,
		});
	}
}

export default new AuthController();
