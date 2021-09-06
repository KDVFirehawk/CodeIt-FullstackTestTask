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

	async validateToken(token) {
		const decoded = jwt.verify(token, config.app.jwtSecret);
		return decoded;
	}
}

export default new SignTokenHelper();
