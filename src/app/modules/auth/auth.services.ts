import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { TUser } from '../users/users.interface';
import { User } from '../users/users.model';
import { TLoginUser } from './auth.interface';
import { createToken } from './auth.utils';

const createUserIntoDB = async (payload: TUser) => {
  try {
    const result = await User.create(payload);
    return result;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create User');
  }
};

const loginUser = async (payload: TLoginUser) => {
  // checking if user is exist
  const user = await User.findOne({ email: payload?.email }).select(
    '+password',
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User Not Found');
  }

  if (user.password !== payload.password) {
    throw new AppError(httpStatus.NOT_FOUND, "Email or Password doesn't match");
  }

  // send accessToken
  const jwtPayload = {
    email: user.email,
    role: user.role,
  };
  // const bearerToken = `Bearer ${jwtPayload}`
  const accessToken = createToken(
    // jwtPayload,
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  // return `Bearer ${accessToken}`
  return accessToken;
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
