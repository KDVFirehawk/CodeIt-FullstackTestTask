import UserDBService from '../services/UserDBService.js';
import config from '../config.js';

class UserController {
	async getUsers(req, res) {
		const users = await UserDBService.getAllUsers();
		return res.json({ users });
	}
	async getUser(req, res) {
		const { emailOrLogin } = req.params;
		const user = await UserDBService.getUser(emailOrLogin);
		return res.json({ user });
	}
}

export default new UserController();
