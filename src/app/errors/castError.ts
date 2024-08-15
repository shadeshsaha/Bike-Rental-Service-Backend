import httpStatus from 'http-status';
import mongoose from 'mongoose';
import { TErrorMessages } from '../interface/error';

const handleCastError = (err: mongoose.Error.CastError) => {
  const statusCode = httpStatus.BAD_REQUEST;
  const message = err.message;
  const errorMessages: TErrorMessages = [
    {
      path: err.path,
      message: err.message,
    },
  ];

  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleCastError;
