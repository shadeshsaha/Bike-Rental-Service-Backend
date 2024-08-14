import { ZodError, ZodIssue } from 'zod';
import { TErrorMessages, TGenericResponse } from '../interface/error';
import status from 'http-status';
export const zodErrorHandler = (err: ZodError): TGenericResponse => {
  const errorMessages: TErrorMessages = err.issues?.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = status.BAD_REQUEST;

  return {
    statusCode,
    message: 'Zod validation error',
    errorMessages,
  };
};
