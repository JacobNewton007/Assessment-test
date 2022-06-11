import chalk from 'chalk';
import winston from 'winston';
import redis from 'redis';
import { StatusCodes } from 'http-status-codes';
import { promisify } from 'util';
import debug from 'debug';
import { ResponsePacket } from '../types/types';
import dotenv from 'dotenv'
import { nanoid } from 'nanoid';

import {
  ENVIRONMENT,
  API_VERSION_ONE_URL
} from '../constants/index.constants';

dotenv.config()


const myformat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp(),
  winston.format.printf(
    (info) => `${info.timestamp} ${info.level} ${info.message} ${info.stack}`
  )
);

/**
 * Winston logger
 */
const devLogger = winston.createLogger({
  level: 'warning',
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'warning',
      maxsize: 500,
      format: myformat,
    }),
    new winston.transports.Console({
      format: myformat,
    }),
  ],
});

const prodLogger = winston.createLogger({
  level: 'warning',
  transports: [
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'info',
      maxsize: 500,
      format: myformat,
    }),
  ],
});

export function logger(level: 'warning' | 'error' | 'info', logInfo: any) {
  if (ENVIRONMENT === 'local') {
    return devLogger.log(level, logInfo);
  }
  return prodLogger.log(level, logInfo);
}

/**
 * Handle all non defined route visits
 * @param res http response object
 */
export function invalidRoute(_: any, res: any) {
  return res.status(StatusCodes.NOT_FOUND).json({ message: 'Route not exist' });
}

/**
 * Logs message to the console in dev mode
 * @param data the data to be logged
 * @param textColor color of console
 */
export function log(data: any, textColor = chalk.bold.cyanBright) {
  const print = debug('matacare-api');
  print(textColor(data));
}

/**
 * Handle api v1 route testing
 * @param res http response object
 */
export function testRoute(_: any, res: any) {
  return res
    .status(StatusCodes.OK)
    .json({ message: 'Welcome to Teesas API' });
}

/**
 * Handles management of all failed requests
 */
export function errorResponse({
  res,
  status,
  message,
  error,
  statusCode = 500,
}: ResponsePacket) {
  res.status(statusCode).json({ message, status, ...(error && { error }) });
}

/**
 * Handles sending responses to the front end.
 */
export async function okResponse({
  res,
  message,
  status,
  success,
  data,
  token,
  statusCode = 200,
}: ResponsePacket) {
  res.status(statusCode).json({ message, success, status, token, ...(data && { data }) });
}




export function getPagination(page: number, size: number) {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;
  return { limit, offset };
}

export function getPagingData(body: any, page: number, limit: number) {
  const { count: totalItems, rows: data } = body;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems/limit)

  return { totalItems, data, totalPages, currentPage };
}


