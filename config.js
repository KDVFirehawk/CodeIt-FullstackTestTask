const config = {
	app: {
		PORT: process.env.PORT || 5000,
		bcryptSalt: 10,
		jwtSecret: 'This is very secret key, no one can hack this, yep very confidential',
		accessTokenExpires: '5m',
		refreshTokenExpires: '48h',
		cookieSecretKey: 'Sercet key, i have no ideas',
	},
	cookieRefreshToken: {
		maxAge: 48 * 60 * 60 * 1000,
		httpOnly: true,
		path: '/api/refresh',
	},
	mySql: {
		connectionSettings: {
			connectionLimit: 5,
			host: 'localhost',
			user: 'kdvfirehawk',
			database: 'codeitauthtesttask',
			password: 'kdvfirehawk',
		},
		connectionSettingsHost: {
			connectionLimit: 5,
			host: 'sql11.freemysqlhosting.net',
			user: 'sql11435010',
			database: 'sql11435010',
			password: 'xxxxxxxxxxx',
			port: '3306',
		},
	},
};

export default config;
