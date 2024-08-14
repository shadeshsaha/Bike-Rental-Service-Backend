import mongoose from 'mongoose';
import { TErrorMessages, TGenericResponse } from '../interface/error';
import status from 'http-status';
export const castErrorHandler = (
  err: mongoose.Error.CastError,
): TGenericResponse => {
  const errorMessages: TErrorMessages = [
    { path: err.path, message: err.message },
  ];

  const statusCode = status.BAD_REQUEST;

  return {
    statusCode,
    message: 'Mongoose cast error',
    errorMessages,
  };
};
