import { Response } from 'express';

type Data<T> = {
  statusCode: number;
  success: boolean;
  message: string;
  token?: string;
  data: T;
};

const successResponse = <T>(res: Response, data: Data<T>) => {
  return res.status(data?.statusCode).json({
    success: data?.success,
    statusCode: data.statusCode,
    message: data?.message,
    token: data.token,
    data: data?.data,
  });
};

export default successResponse;
