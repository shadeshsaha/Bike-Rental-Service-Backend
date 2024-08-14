import httpStatus from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successResponse';
import { userServices } from './users.service';

const retrieveUser = catchAsync(async (req, res) => {
  const user = req.user;

  const data = await userServices.retrieveAllUsers(user?.email);
  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully!',
    data,
  });
});

const updateSingleUser = catchAsync(async (req, res) => {
  const user = req.user;
  const body = req.body;
  const data = await userServices.updateProfile(user?.email, body);
  successResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully!',
    data,
  });
});

export const userControllers = {
  retrieveUser,
  updateSingleUser,
};
