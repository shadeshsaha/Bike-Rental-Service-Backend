import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import AppError from '../../errors/AppError';
import { TUser } from './users.interface';
import { User } from './users.model';

const getProfileFromDB = async (payload: JwtPayload | null) => {
  try {
    if (payload !== null) {
      const result = await User.findOne({
        email: payload.email,
      }).select('+password');
      return result;
    }
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Get User');
  }
};

const updateProfileIntoDB = async (
  payload: JwtPayload | null,
  bodyPayload: Partial<TUser>,
) => {
  try {
    if (payload) {
      const email = payload.email;
      const result = User.findOneAndUpdate({ email }, bodyPayload, {
        upsert: true,
        new: true,
      });
      return result;
    }
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Failed to Get User');
  }
};
export const UserServices = {
  getProfileFromDB,
  updateProfileIntoDB,
};
