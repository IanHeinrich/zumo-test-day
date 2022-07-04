import express from 'express';
import { json } from 'body-parser';
import { prepareUnspentOutputsRouter } from './routes/prepare-unspent-outputs.route';
import { logger } from './middlewares/logger.middleware';

const app = express();
app.use(json());
app.use(logger)
app.use(prepareUnspentOutputsRouter);

export { app };
