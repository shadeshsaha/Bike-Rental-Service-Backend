import httpStatus from 'http-status'
import jwt, { JwtPayload } from 'jsonwebtoken'
import config from '../../config'
import AppError from '../../errors/AppError'
import catchAsync from '../../utils/catchAsync'
import sendResponse from '../../utils/sendResponse'
import { User } from '../user/user.model'
import { AuthServices } from './auth.services'

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  })
})

const loginUser = catchAsync(async (req, res) => {
  const user = await User.findOne({ email: req?.body?.email })

  const accessToken = await AuthServices.loginUser(req.body)

  const decoded = jwt.verify(
    // tokenSplit[1],
    accessToken,
    config.jwt_access_secret as string,
  ) as JwtPayload
  const { email: decodedEmail } = decoded

  if (user?.email !== decodedEmail) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Mis Information')
  }

  const bearerAccessToken = `Bearer ${accessToken}`
  res.cookie('accessToken', bearerAccessToken, {
    secure: config.NODE_ENV === 'production',
    httpOnly: true,
  })
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    token: bearerAccessToken,
    data: user,
  })
})

export const AuthController = {
  createUser,
  loginUser,
}
