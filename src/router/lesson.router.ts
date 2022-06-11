import { Router, Request, Response, NextFunction } from 'express';
import { validateCreateLesson } from '../middleware/user.middleware';
import { ROUTES } from '../constants/index.constants';
import LessonController from '../controllers/lesson.controller';
import {isEmailAvailable, isLoggedIn } from '../middleware/auth.middleware';

const {
GET_LESSON,
GET_LESSONS,
CREATE_LESSON
} = ROUTES

const {
  createLesson,
  getAllLesson,
  getLesson
} = LessonController;

const LessonRouter = Router();

LessonRouter.get(
  GET_LESSON,
  isLoggedIn,
  getLesson
)

LessonRouter.get(
  GET_LESSONS,
  isLoggedIn,
  getAllLesson
)

LessonRouter.post(
  CREATE_LESSON, 
  validateCreateLesson,
  createLesson
)


export default LessonRouter