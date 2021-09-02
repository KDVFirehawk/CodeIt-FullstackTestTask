import CountryDBService from '../services/CountryDBService.js';

class CountryController {
	async getCountries(req, res) {
		const countries = await CountryDBService.getAllCountries();
		return res.json({ countries });
	}
}

export default new CountryController();
