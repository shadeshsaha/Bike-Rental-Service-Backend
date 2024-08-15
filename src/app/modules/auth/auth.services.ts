import bcrypt from 'bcrypt';
import status from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';
import { AppError } from '../../errors/AppError';
import { TUser } from '../users/users.interface';
import { userModel } from './../users/users.model';
import { TUserLogin } from './auth.interface';

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

  const token = jwt.sign(tokenPayload, config.JWT_SECRET as string, {
    expiresIn: config.EXPIRES_IN,
  });

  const user = await userModel
    .findById(userExist._id)
    .select({ password: 0, createdAt: 0, updatedAt: 0 });

  return { token, data: user };
};

export const authServices = { signUpUser, loginUser };
