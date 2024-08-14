import status from 'http-status';
import { AppError } from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBike = async (payload: TBike) => {
  console.log('payload', payload);
  const data = await Bike.create(payload);
  console.log('data', data);

  return data;
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const getAllBikes = async (query: any) => {
  const data = await Bike.find().select({ createdAt: 0, updatedAt: 0 });
  console.log('data', data);

  if (!data || data.length < 1) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }

  return data;
};

const updateBikes = async (id: string, payload: Partial<TBike>) => {
  console.log('id, payload:', id, payload);

  // check is bike exist?
  const isBikeExist = await Bike.findById(id);
  console.log('isBikeExist:', isBikeExist);

  if (!isBikeExist) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }

  const data = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select({ createdAt: 0, updatedAt: 0 });
  console.log('data:', data);

  return data;
};

const deleteBikes = async (id: string) => {
  const isBikeExist = await Bike.findById(id);
  console.log('isBikeExist:', isBikeExist);

  if (!isBikeExist) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }

  const data = await Bike.findByIdAndDelete(id).select({
    createdAt: 0,
    updatedAt: 0,
  });
  console.log('data:', data);

  return data;
};

export const bikeServices = {
  createBike,
  getAllBikes,
  updateBikes,
  deleteBikes,
};
