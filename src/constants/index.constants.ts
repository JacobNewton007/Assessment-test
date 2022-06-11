import { config } from 'dotenv';
import RateLimiter from 'express-rate-limit';

config();

export const {
  PORT,
  NODE_ENV,
  ENVIRONMENT,
  REDIS_URL,
  JWT_AUTH_SECRET,
  REDIS_EXPIRY,
  AUTH_TOKEN_LIFETIME,
  RANGE_FOR_SUGGESTION,
} = process.env;

/**
 * URL for version one of API
 * @constant
 */
export const API_VERSION_ONE_URL = '/api/v1';



/**
 * DDOS attack preventer. App should not allow a user
 * make more than 600 requests every 10 minutes i.e a request per second
 * @constant
 */
export const APP_USE_LIMIT = RateLimiter({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 600, // limit each IP to 600 requests every 10 minutes, i.e a request per second,
  message: 'Too many requests from this user, please try again after 5 minutes',
});

/**
 * URL for production web application
 * @constant
 */
export const PRODUCTION_URL = '';

/**
 * URL for staging web application.
 * @constant
 */
export const STAGING_CLIENT_URL = '';

/**
 * URL for local development
 * @constant
 */
export const LOCAL_CLIENT_URL = 'http://localhost:8888';

/**
 * Application cors origin
 * @constant
 */
export const ORIGIN =
  NODE_ENV === 'production'
    ? [PRODUCTION_URL]
    : [STAGING_CLIENT_URL, LOCAL_CLIENT_URL];


/**
* Config options for cors
* @constant
*/
export const CORS_OPTIONS = {
  origin: '*', //TODO: change origin to trusted IP
  credentials: true,
  exposedHeaders: ['x-id-key', 'session-key'],
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

/**
 * API routes
 */
export const ROUTES = {

  // users
  SIGN_UP: '/user/sign-up',
  LOGIN: '/user/login',

  // lesson

  CREATE_LESSON: '/create-lesson',
  GET_LESSON: '/lesson/:lesson_id',
  GET_LESSONS: '/lessons',

 


  // others
  HOME: '/',
  WILD_CARD: '/*',
}

/**
 * Password encryption salt rounds
 * @const
 */
export const SALT_ROUNDS = 10;

/**
 * Redis client
 */
