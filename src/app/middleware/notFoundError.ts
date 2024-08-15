import { NextFunction, Request, Response } from 'express';
import status from 'http-status';
export const notfoundError = (
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  return res.status(404).json({
    success: false,
    statusCode: status.NOT_FOUND,
    message: 'Not Found!',
  });
};
