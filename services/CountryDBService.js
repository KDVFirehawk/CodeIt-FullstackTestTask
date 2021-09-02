import sqlPool from '../database/mySqlConnection.js';
import { NotFoundError } from '../exceptions/Exceptions.js';

class CountryDBService {
	async getAllCountries() {
		const allCountries = await sqlPool.execute(`SELECT * FROM country`);
		if (!allCountries[0].length) throw new NotFoundError('Countries not found');
		return allCountries[0];
	}
}

export default new CountryDBService();
