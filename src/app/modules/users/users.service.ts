import { JwtPayload } from 'jsonwebtoken';
import { AppError } from '../../errors/AppError';
// import { TUser } from './users.interface';
import { userModel } from './users.model';
import status from 'http-status';
import { TUser } from './users.interface';

const retrieveAllUsers = async (payload: JwtPayload) => {
  const result = await userModel
    .find({ email: payload })
    .select({ password: 0 });

  if (!result || result.length < 1) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }

  return result;
};

const updateProfile = async (email: JwtPayload, payload: Partial<TUser>) => {
  const result = await userModel
    .findOneAndUpdate({ email: email }, payload, {
      new: true,
      runValidators: true,
    })
    .select({ password: 0, createdAt: 0, updatedAt: 0 });
  if (!result) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }
  return result;
};

export const userServices = {
  retrieveAllUsers,
  updateProfile,
};
