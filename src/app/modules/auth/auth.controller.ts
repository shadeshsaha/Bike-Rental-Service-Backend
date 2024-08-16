import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.services';

// * login controllers
const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginService(req.body);
  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User logged in successfully',
    token: result?.token,
    data: result?.userObj,
  });
});

// * signup controllers
const signUp = catchAsync(async (req, res) => {
  const result = await AuthServices.signUpAUserService(req.body);
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'User registered successfully',
    result,
  });
});

export const AuthControllers = {
  login,
  signUp,
};
