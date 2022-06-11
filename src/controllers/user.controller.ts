import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { StatusCodes, ReasonPhrases,  } from 'http-status-codes';
import { RequestWithUser } from '../types/types'
import { pick } from 'lodash';
import jwt from 'jsonwebtoken';
import db from '../db/model';
import { nanoid } from 'nanoid';
import {
  okResponse,
  errorResponse,
  logger,
} from '../helpers/index.helpers';

const { User } = db
const { CREATED, NOT_FOUND, OK, BAD_REQUEST , UNAUTHORIZED} = StatusCodes;
const { UNAUTHORIZED: UNAUTHORIZED_MESSAGE, BAD_GATEWAY: BAD_GATEWAY_MESSAGE } = ReasonPhrases;

import {
  SALT_ROUNDS,
  JWT_AUTH_SECRET,
  REDIS_EXPIRY,
  AUTH_TOKEN_LIFETIME
} from '../constants/index.constants';

export default class UserController { 
  /**
   * Handle user register action
   */
    static async registerUser(req: Request, res: Response) {
    const { body } = req;
    const { password, email } = body;
    try {
      const securePassword = bcrypt.hashSync(password, SALT_ROUNDS);
      await User.create({
        ...body,
        password: securePassword,
        comfirmPassword: securePassword
      });
      return okResponse({
        res,
        data: '',
        status: true,
        message: 'learner created successfully',
        statusCode: CREATED,
      });
    } catch (error: any) {
      console.log(error)
      logger('error', error?.message || error);
      return errorResponse({
        res,
        status: false,
        message: `We encountered a problem while creating the account. Please try again, Or contact support`,
      });
    }
  }

  /**
   * user login
   */
  static async login(req: Request, res: Response) {
    const { email, password, comfirmPassword } = req.body
    try {
      const user = await User.findOne({
        where: { email }
      })
      if (user === null) {
        return errorResponse({
          res,
          message: "Sorry, we couldn't find a user with those details.",
          statusCode: NOT_FOUND,
        });
      }
      console.log(user.password, password)
      const encryptedPassword = user.password;
      const isValid = bcrypt.compareSync(password, encryptedPassword);
      if (!isValid) {
        return errorResponse({
          res,
          message: 'Sorry, those credentials are incorrect.',
          statusCode: BAD_REQUEST,
        });
      }
      const userDetails = pick(
        user,
        'id',
        'childName',
        'email',
      );

      const token = jwt.sign({ ...userDetails }, String(JWT_AUTH_SECRET), {
        expiresIn: AUTH_TOKEN_LIFETIME,
      });

      return okResponse({
        res,
        success: true,
        token: token,
        message: 'Logged in successfully',
        statusCode: OK,
      });
    } catch (error: any) {
      logger('error', error?.message || error);
      return errorResponse({
        res,
        message: `We encountered a problem while processing your request. Please try again.`,
      });
    }
  }

}
