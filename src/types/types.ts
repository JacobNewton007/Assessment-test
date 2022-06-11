import { Request, Response } from 'express';

/**
 * This defines what our responses should look like
 * @type
 */
export type ResponsePacket = {
  res: Response;
  data?: any;
  message: string;
  token?: string;
  success?: boolean;
  error?: any;
  status?: boolean,
  statusCode?: number;
};

/**
 * User type
 */
export type User = {
  email: string;
  id: string;
}

/**
 * Response object with user attached
 * @interface
 */
export interface RequestWithUser extends Request {
  file?: any; // TODO: resolve any type
  user?: User;

}


