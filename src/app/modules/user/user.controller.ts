import httpStatus from 'http-status'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { UserServices } from './user.services'

const getProfile = catchAsync(async (req, res) => {
  const result = await UserServices.getProfileFromDB(req.user)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  })
})

const updateProfile = catchAsync(async (req, res) => {
  const result = await UserServices.updateProfileIntoDB(req.user, req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  })
})

export const UserControllers = {
  getProfile,
  updateProfile,
}
