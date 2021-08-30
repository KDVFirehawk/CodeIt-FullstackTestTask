import config from '../config.js';
import jwt from 'jsonwebtoken';
import printError from './PrintError.js';

class SignTokenHelper {
	async newAccessRefresh(tokenData) {
		try {
			const accessToken = jwt.sign(tokenData, config.app.jwtSecret, {
				expiresIn: config.app.accessTokenExpires,
			});
			const refreshToken = jwt.sign(tokenData, config.app.jwtSecret, {
				expiresIn: config.app.refreshTokenExpires,
			});

			return { accessToken, refreshToken };
		} catch (e) {
			printError(e, 'SignTokenHelper newAccessRefresh');
			throw e;
		}
	}
}

export default new SignTokenHelper();
