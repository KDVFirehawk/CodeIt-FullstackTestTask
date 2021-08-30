import sqlPool from '../database/mySqlConnection.js';
import printError from '../helpers/PrintError.js';
import TokenExceptions from '../exceptions/TokenExceptions.js';

/**
 * This class is created for storing Refresh tokens in database
 * Creating new user + refresh token references
 * Updating existing user + refresh token references
 * Deleting refresh tokens => user refresh token = null if user makes logout
 */

class TokenDBService {
	async newRefreshToken(userId, refreshToken) {
		try {
			const values = `${userId},'${refreshToken}'`;

			await sqlPool.execute(`INSERT token(userId, refreshToken) VALUES (${values})`);
		} catch (e) {
			printError(e, 'TokenDBService newRefreshToken');
			return e;
		}
	}
	async getRefreshToken(userId) {
		try {
			const refreshToken = await sqlPool.execute(
				`SELECT * FROM token WHERE userId = ${userId}`,
			);

			if (!refreshToken[0].length) TokenExceptions.tokenNotFound();
			return refreshToken[0][0];
		} catch (e) {
			printError(e, 'TokenDBService getRefreshToken');
			return TokenExceptions.tokenNotFound();
		}
	}
	async updateRefreshToken(userId, token) {
		try {
			await sqlPool.execute(
				`UPDATE token SET refreshToken = '${token}' WHERE userId = ${userId}`,
			);
		} catch (e) {
			printError(e, 'TokenDBService updateRefreshToken');
			return e;
		}
	}
}

export default new TokenDBService();
