import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

import {
  API_VERSION_ONE_URL,
  APP_USE_LIMIT,
  CORS_OPTIONS,
  ROUTES,
  PORT,
  NODE_ENV,
} from './constants/index.constants';

import versionOneRouter from './router/index.router';
import { invalidRoute, log } from './helpers/index.helpers';

const app = express();

app.use(helmet());
app.use(cors(CORS_OPTIONS));
app.use(APP_USE_LIMIT);
app.use(express.json());
app.use(morgan('dev'));

// handle every valid request i.e request to api/v1
app.use(API_VERSION_ONE_URL, versionOneRouter);


// reject all unknown routes (routes not directed to api/v1)
app.all(ROUTES.WILD_CARD, invalidRoute);


app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});


export default app;
