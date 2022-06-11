import { Router } from 'express';
import { ROUTES } from '../constants/index.constants';
import { invalidRoute, testRoute } from '../helpers/index.helpers';
import UserRouter from './user.router';
import LessonRouter from './lesson.router';


const { WILD_CARD, HOME } = ROUTES;

// router for testing if api is live
const testRouter = Router();
testRouter.all(HOME, testRoute);

// handle unknown routes in the api domain
const invalidRoutes = Router();
invalidRoutes.all(WILD_CARD, invalidRoute);

const versionOneRouter = [
  testRouter,
  UserRouter,
  LessonRouter,
  invalidRoutes,
]

export default versionOneRouter;
