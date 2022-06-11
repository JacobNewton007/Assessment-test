import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { errorResponse } from '../helpers/index.helpers';
import {
  registerUserValidation,
  loginVerification,
  createLessonVerification

} from '../validators/user.validator'

const { UNPROCESSABLE_ENTITY } = StatusCodes;

export async function validateUserRegistration(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const valid = await registerUserValidation.validateAsync(req.body);
    req.body = valid;
    return next();
  } catch (error: any) {
    return errorResponse({
      res,
      statusCode: UNPROCESSABLE_ENTITY,
      message: error.details[0].message,
      error: error.details[0].message,
    });
  }
}


export async function validateLogin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const valid = await loginVerification.validateAsync(req.body);
    req.body = valid;
    return next();
  } catch (error: any) {
    return errorResponse({
      res,
      statusCode: UNPROCESSABLE_ENTITY,
      message: error.details[0].message,
      error: error.details[0].message,
    });
  }
}

export async function validateCreateLesson(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const valid = await createLessonVerification.validateAsync(req.body);
    req.body = valid;
    return next();
  } catch (error: any) {
    return errorResponse({
      res,
      statusCode: UNPROCESSABLE_ENTITY,
      message: error.details[0].message,
      error: error.details[0].message,
    });
  }
}