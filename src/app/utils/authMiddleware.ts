import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { AppError } from '../errors/AppError';
import { catchAsync } from './catchAsync';

export const auth = (...RequireRoles: (string | undefined)[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];

    // if the token send from the token
    if (!token) {
      throw new AppError(status.UNAUTHORIZED, 'You are unauthorized!');
    }

    // check is the token verify?

    jwt.verify(token, config.jwt_secret, (err, decoded) => {
      if (err) {
        throw new AppError(
          status.UNAUTHORIZED,
          'You are unauthorized! Invalid token.',
        );
      }

      const payload = decoded as JwtPayload;

      // Checking the payload type
      if (!payload.email || !payload.role) {
        throw new AppError(
          status.UNAUTHORIZED,
          'You are unauthorized! Invalid token.',
        );
      }

      if (RequireRoles && !RequireRoles.includes(payload.role)) {
        throw new AppError(status.UNAUTHORIZED, 'You are unauthorized!.');
      }

      // Set the decoded payload to req.user
      req.user = payload;

      next();
    });
  });
};
