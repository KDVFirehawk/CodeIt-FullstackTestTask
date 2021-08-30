const config = {
	app: {
		PORT: process.env.PORT || 3000,
		bcryptSalt: 10,
		jwtSecret: 'This is very secret key, no one can hack this, yep very confidential',
		accessTokenExpires: '15m',
		refreshTokenExpires: '48h',
	},
	mySql: {
		connectionSettings: {
			connectionLimit: 5,
			host: 'localhost',
			user: 'kdvfirehawk',
			database: 'codeitauthtesttask',
			password: 'kdvfirehawk',
		},
	},
};

export default config;
