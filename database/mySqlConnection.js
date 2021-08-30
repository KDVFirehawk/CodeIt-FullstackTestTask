import { createPool } from 'mysql2';
import config from '../config.js';

const sqlPool = createPool(config.mySql.connectionSettings).promise();

export default sqlPool;
