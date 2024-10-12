import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';

import logger, { logStream } from './config/logger.js';
import database from './config/database.js';
import routes from './routes/index.js';

dotenv.config();

const host = process.env.APP_HOST;
const port = process.env.APP_PORT;
const api_version = process.env.API_VERSION;


const app = express();
global.logger = logger;
database();

app.use(cors());
app.use(helmet());
app.use(morgan('combined', { stream: logStream }));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(`/api/${api_version}`, routes());

app.listen(port, () => {
  logger.info(`Server started at ${host}:${port}/api/${api_version}/`);
});
