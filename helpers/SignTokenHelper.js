import config from '../config.js';
import jwt from 'jsonwebtoken';

class SignTokenHelper {
	async newAccessRefresh(tokenData) {
		const accessToken = jwt.sign(tokenData, config.app.jwtSecret, {
			expiresIn: config.app.accessTokenExpires,
		});
		const refreshToken = jwt.sign(tokenData, config.app.jwtSecret, {
			expiresIn: config.app.refreshTokenExpires,
		});

		return { accessToken, refreshToken };
	}
}

export default new SignTokenHelper();
