import sqlPool from '../database/mySqlConnection.js';
import { NotFoundError } from '../exceptions/Exceptions.js';

/**
 * This class is created for storing Refresh tokens in database
 * Creating new user + refresh token references
 * Updating existing user + refresh token references
 * Deleting refresh tokens => user refresh token = null if user makes logout
 */

class TokenDBService {
	async newRefreshToken(userId, refreshToken) {
		const values = `${userId},'${refreshToken}'`;

		await sqlPool.execute(`INSERT token(userId, refreshToken) VALUES (${values})`);
	}

	async getRefreshToken(userId) {
		const refreshToken = await sqlPool.execute(`SELECT * FROM token WHERE userId = ${userId}`);

		if (!refreshToken[0].length) throw new NotFoundError('Token not found');
		return refreshToken[0][0];
	}

	async updateRefreshToken(userId, token) {
		await sqlPool.execute(
			`UPDATE token SET refreshToken = '${token}' WHERE userId = ${userId}`,
		);
	}
}

export default new TokenDBService();
