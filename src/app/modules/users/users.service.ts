import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
import { IUser } from './users.interface';
import { User } from './users.model';

const seeProfileServices = async (payload: JwtPayload) => {
  const email = payload?.email;
  const result = await User.findOne({ email }).select('-password');
  if (!result) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user found');
  }
  return result;
};

const updateProfileServices = async (
  payload: JwtPayload,
  userData: Partial<IUser>,
) => {
  console.log('payload', payload);
  console.log('userData', userData);
  const email = payload?.email;
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'No user found');
  }
  const result = await User.findOneAndUpdate({ email }, userData, {
    new: true,
  }).select('-password');
  return result;
};

export const UserServices = {
  seeProfileServices,
  updateProfileServices,
};
