import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import { AppError } from '../errors/AppError';
import { castErrorHandler } from '../errors/castError';
import { duplicateErrorHandler } from '../errors/duplicateErrorHandler';
import { mongooseValidationError } from '../errors/mongooseValidation';
import { zodErrorHandler } from '../errors/zodErrorHandler';
import { TErrorMessages } from '../interface/error';

export const globalError = (
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  err: any,
  req: Request,
  res: Response,
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  next: NextFunction,
) => {
  let statusCode = 500;

  let message = err.message || 'Something went wrong!';

  let errorMessages: TErrorMessages = [
    {
      path: '',
      message: message,
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = zodErrorHandler(err);

    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessages = simplifiedError.errorMessages;
  } else if (err.name === 'ValidationError') {
    const simplified = mongooseValidationError(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorMessages = simplified.errorMessages;
  } else if (err.name === 'CastError') {
    const simplified = castErrorHandler(err);
    statusCode = simplified.statusCode;
    message = simplified.message;
    errorMessages = simplified.errorMessages;
  } else if (err.code === 11000) {
    // mongoose duplicate error handler
    const simplifyMongooseError = duplicateErrorHandler(err);
    statusCode = simplifyMongooseError?.statusCode;
    message = simplifyMongooseError?.message;
    errorMessages = simplifyMongooseError?.errorMessages;
  } else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err?.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessages = [
      {
        path: '',
        message: err?.message,
      },
    ];
  }

  return res.status(statusCode).json({
    success: false,
    message: message,
    errorMessages,
    stack: config.node_ENV === 'development' ? err?.stack : 'error stack',
  });
};
