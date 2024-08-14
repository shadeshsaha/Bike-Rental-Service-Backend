import { TErrorMessages, TGenericResponse } from '../interface/error';
import status from 'http-status';
export const duplicateErrorHandler = (err: {
  message: string;
}): TGenericResponse => {
  const match = err.message.match(/"([^"]*)"/);

  const extractedMessage = match && match[1];

  const errorMessages: TErrorMessages = [
    {
      path: '',
      message: `${extractedMessage} is already exist.`,
    },
  ];
  const statusCode = status.BAD_REQUEST;

  return {
    statusCode,
    message: 'Invalid Id Error',
    errorMessages,
  };
};
