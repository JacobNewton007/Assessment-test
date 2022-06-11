import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { RequestWithUser } from '../types/types'
import {
  logger,
  errorResponse,
} from '../helpers/index.helpers';
import db from '../db/model';
const { User, } = db;
import { JWT_AUTH_SECRET, NODE_ENV } from '../constants/index.constants';


const { UNPROCESSABLE_ENTITY, BAD_GATEWAY, UNAUTHORIZED } = StatusCodes;
const { UNAUTHORIZED: UNAUTHORIZED_MESSAGE, BAD_GATEWAY: BAD_GATEWAY_MESSAGE } =
  ReasonPhrases;


  export async function isLoggedIn(
    req: RequestWithUser,
    res: Response,
    next: NextFunction
  ) {
    // The request header contains a token
    const bearer: any = req.headers["authorization"];
    const userToken = bearer.split(" ")

    try {
      if (userToken[1]) {
          const user: any = jwt.verify(userToken[1], String(JWT_AUTH_SECRET));
          req.user = user;
          return next();
      }
      // No token in request header
      return errorResponse({
        res,
        success: false,
        message: UNAUTHORIZED_MESSAGE,
        statusCode: UNAUTHORIZED,
      });
    } catch (error) {
      return errorResponse({
        res,
        success: false,
        message: UNAUTHORIZED_MESSAGE,
        statusCode: UNAUTHORIZED,
      });
    }
  }


/**
 * Verify if email has been used
 */
export async function isEmailAvailable(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
    body: { email },
  } = req;
  try {
    const creator = await User.findOne({
      where: { email },
    });
    if (creator !== null) {
      return errorResponse({
        res,
        statusCode: UNPROCESSABLE_ENTITY,
        status: false,
        message: 'Email has been used.',
      });
    }
    return next();
  } catch (error: any) {
    console.log(error)
    logger('error', error);
    return errorResponse({
      res,
      statusCode: BAD_GATEWAY,
      message: `We encountered a problem while trying to process your request.
      Please try again.`,
    });
  }
}