import UserDBService from '../services/UserDBService.js';
import printError from '../helpers/PrintError.js';

class UserController {
	async getUsers(req, res) {
		try {
			const users = await UserDBService.getAllUsersSafeInfo();
			return res.json({ users });
		} catch (e) {
			printError(e, 'UserController getAllUsers');
			if (e.type === 'user400')
				return res.status(400).json({ Error: 'Invalid login or email' });
			if (e.type === 'user404') return res.status(400).json({ Error: 'User not found' });
			return res.status(500).json({ Error: 'Server error' });
		}
	}
	async getUser(req, res) {
		try {
			const { emailOrLogin } = req.params;
			const user = await UserDBService.getUserSafeInfo(emailOrLogin);
			return res.json({ user });
		} catch (e) {
			printError(e, 'UserController getUser');
			if (e.type === 'user400')
				return res.status(400).json({ Error: 'Invalid login or email' });
			if (e.type === 'user404') return res.status(400).json({ Error: 'User not found' });
			return res.status(500).json({ Error: 'Server error' });
		}
	}
}

export default new UserController();
