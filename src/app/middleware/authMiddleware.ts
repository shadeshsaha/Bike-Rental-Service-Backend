import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';
import { User } from '../modules/users/users.model';
import { TUserRole } from '../utils';
import catchAsync from '../utils/catchAsync';

export const authMiddleware = (...givenRole: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const headers = req.headers.authorization;
    // * check if headers present or not
    if (!headers) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    const authToken = headers.split('Bearer ')[1];
    // * check authToken is present or not
    if (!authToken) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    // * then verify the authToken
    const payload = jwt.verify(
      authToken,
      config.JWT_SECRET as string,
    ) as JwtPayload;
    if (!payload) {
      throw new AppError(httpStatus.FORBIDDEN, 'Payload is corrupted');
    }
    // * if everything is okay then extract the role and email from payload
    const { role, email } = payload;
    // * check if the role is included or not
    if (givenRole && !givenRole.includes(role)) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You have no access to this route',
      );
    }
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError(httpStatus.FORBIDDEN, 'No User Found');
    }
    next();
  });
};
