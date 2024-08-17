import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/sendResponse';
import { authServices } from './auth.services';

const signUpUser = catchAsync(async (req, res) => {
  const body = req.body;

  const data = await authServices.signUpUser(body);
  successResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User registered successfully',
    data,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;

  const { token, data } = await authServices.loginUser(body);

  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: token,
    data,
  });
});

export const authController = { signUpUser, loginUser };
