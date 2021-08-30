import bcryptjs from 'bcryptjs';
import UserDBService from '../services/UserDBService.js';
import TokenDBService from '../services/TokenDBService.js';
import SignTokenHelper from '../helpers/SignTokenHelper.js';
import printError from '../helpers/PrintError.js';

class AuthController {
	async register(req, res) {
		try {
			const { email, login, name, password, birthDate, country } = req.body;

			//TODO EXIST
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
			});

			const userSafeInfo = await UserDBService.getUserSafeInfo(email);

			await TokenDBService.newRefreshToken(userSafeInfo.userId, refreshToken);

			return res.json({
				createdUser: userSafeInfo,
				accessToken,
				refreshToken,
			});
		} catch (e) {
			printError(e, 'AuthController register');
			return res.status(500).json({ Error: 'Registration error' });
		}
	}

	async login(req, res) {
		try {
			const { emailOrLogin, password } = req.body;

			const userFullInfo = await UserDBService.getUserFullInfo(emailOrLogin);

			const checkPassword = bcryptjs.compare(password, userFullInfo.password);
			if (!checkPassword) return res.status(400).json({ Error: 'Wrong email or password' });

			const { accessToken, refreshToken } = await SignTokenHelper.newAccessRefresh({
				email: userFullInfo.email,
				login: userFullInfo.login,
				name: userFullInfo.name,
				country: userFullInfo.country,
			});

			await TokenDBService.updateRefreshToken(userFullInfo.userId, refreshToken);

			const userSafeInfo = await UserDBService.getUserSafeInfo(userFullInfo.email);

			return res.json({
				user: userSafeInfo,
				accessToken,
				refreshToken,
			});
		} catch (e) {
			printError(e, 'AuthController login');
			if (e.type === 'user404') return res.status(404).json({ Error: 'User not found' });
			return res.status(500).json({ Error: 'Server error' });
		}
	}

	async logout(req, res) {
		try {
			const { id } = req.params;

			await TokenDBService.updateRefreshToken(id, null);
			res.status(200).end();
		} catch (e) {
			printError(e, 'AuthController logout');
			res.status(500).json({ Error: 'Server error' });
		}
	}
}

export default new AuthController();
