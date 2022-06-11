import { Router, Request, Response, NextFunction } from 'express';
import {
  validateUserRegistration,
  validateLogin,
} from '../middleware/user.middleware'
import { ROUTES } from '../constants/index.constants';
import UserController from '../controllers/user.controller';
import {isEmailAvailable, isLoggedIn } from '../middleware/auth.middleware';

const {
  SIGN_UP,
  LOGIN,
} = ROUTES

const {
  registerUser,
  login,
} = UserController;

const userRouter = Router();

userRouter.post(
  SIGN_UP,
  validateUserRegistration,
  isEmailAvailable,
  registerUser
)

userRouter.post(
  LOGIN,
  validateLogin,
  login
)

export default userRouter