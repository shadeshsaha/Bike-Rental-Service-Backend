import mongoose from 'mongoose';
import { TErrorMessages, TGenericResponse } from '../interface/error';
import status from 'http-status';
export const mongooseValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericResponse => {
  const errorMessages: TErrorMessages = Object.values(err?.errors).map(
    (value: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: value?.path,
        message: value?.message,
      };
    },
  );
  const statusCode = status.BAD_REQUEST;

  return {
    statusCode,
    message: 'Mongoose validation error',
    errorMessages,
  };
};
