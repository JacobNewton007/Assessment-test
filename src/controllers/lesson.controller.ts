import { Request, Response } from 'express'
import slugify from 'slugify';
import db from '../db/model'
import { StatusCodes } from 'http-status-codes';
import { pick } from 'lodash';
import {
  okResponse,
  errorResponse,
  logger,
  getPagination,
  getPagingData,
} from '../helpers/index.helpers';
import { RequestWithUser } from '../types/types';
import { Op } from 'sequelize';

const { Lesson, User,} = db
const { CREATED, NOT_FOUND, OK, BAD_REQUEST } = StatusCodes;

export default class LessonController {
  /**
   * 
   * Create post 
   * 
   */

   static async createLesson(req: RequestWithUser, res: Response) {
    const { body, user } = req
    try {
      const existingSlug = await Lesson.findOne({
        where: {
          name: body.name,
        },
      
      })
      if (existingSlug !== null) {
        return errorResponse({
          res,
          status: false,
          message: "Lesson with this name already exist",
          statusCode: NOT_FOUND,
        });
      }
      let user_id = req.user?.id
      await Lesson.create({
        ...body,
        user_id,
      })
      let response = { ...body}
      return okResponse({
        res,
        data: response,
        success: true,
        message: 'post drafted successufully',
        statusCode: CREATED,
      });
    } catch (error: any) {
      console.log(error)
      logger('error', error?.message || error);
      return errorResponse({
        res,
        message: `We encountered a problem while creating the content. Please try again, Or contact support`,
      });
    }

  }

  static async getLesson(req: RequestWithUser, res: Response) {
    const lesson_id = req.params.lesson_id
    // const user_id = req.user?.id
    // console.log(Number(creator_id), Number(post_id))
    try {
      const lesson = await Lesson.findByPk(lesson_id)
      if (lesson === null) {
        return errorResponse({
          res,
          message: "Lesson not Found",
          statusCode: NOT_FOUND
        })
      }
      return okResponse({
        res,
        data: lesson,
        success: true,
        message: 'success',
        statusCode: OK,
      });

    } catch (error: any) {
      logger('error', error?.message || error);
      // console.log(error)
      return errorResponse({
        res,
        message: `We encountered a problem while fetching the post`,
      });
    }
  }

  static async getAllLesson(req: RequestWithUser, res: Response) {
    const { page, size} = req.query;
    const { limit, offset } = getPagination(Number(page), Number(size));
    try {
      const data = await Lesson.findAndCountAll({
        limit, offset, attributes: {
          exclude: [
            'updatedAt',
            'createdAt',
          ]
        }
      })
      const response = getPagingData(data, Number(page), limit)
      return okResponse({
        res,
        data: response,
        success: true,
        message: 'success',
        statusCode: OK,
      });
    } catch (error: any) {
      console.log(error)
      logger('error', error?.message || error);
      return errorResponse({
        res,
        message: `We encountered a problem while fetching the contents`,
      });
    }
  }
}