import { createPool } from 'mysql2';
import config from '../config.js';

const sqlPool = createPool(config.mySql.connectionSettingsHost).promise();

export default sqlPool;
