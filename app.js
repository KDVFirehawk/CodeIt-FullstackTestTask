import express, { json } from 'express';
import config from './config.js';
import router from './routes/router.js';
import { errorHandlerMiddleware } from './middlewares/ErrorMiddleware.js';

const app = express();
app.use(json({ extended: true }));
app.use('/api', router);

app.use(errorHandlerMiddleware);

const PORT = config.app.PORT;

async function startApp() {
	try {
		app.listen(PORT, () => {
			console.log(`Server started at PORT ${PORT}...`);
		});
	} catch (e) {
		console.log('ERROR: ', e);
	}
}

startApp();
