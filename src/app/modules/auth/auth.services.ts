import bcrypt from 'bcrypt';
import { userModel } from './../users/users.model';
import { TUser } from '../users/users.interface';
import { TUserLogin } from './auth.interface';
import { AppError } from '../../errors/AppError';
import jwt from 'jsonwebtoken';
import status from 'http-status';
import config from '../../config';

const signUpUser = async (payload: TUser) => {
  const result = await userModel.create(payload);
  return result;
};

const loginUser = async (payload: TUserLogin) => {
  // check the user is exist ?
  const userExist = await userModel.findOne({ email: payload.email });
  if (!userExist) {
    throw new AppError(status.BAD_REQUEST, 'No Data Found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    userExist.password,
  );

  if (!isPasswordMatched) {
    throw new AppError(status.UNAUTHORIZED, 'Password incorrect!');
  }

  const tokenPayload = {
    email: payload.email,
    role: userExist.role,
  };

  const token = jwt.sign(tokenPayload, config.jwt_secret as string, {
    expiresIn: config.expires_in,
  });

  const user = await userModel
    .findById(userExist._id)
    .select({ password: 0, createdAt: 0, updatedAt: 0 });

  return { token, data: user };
};

export const authServices = { signUpUser, loginUser };
