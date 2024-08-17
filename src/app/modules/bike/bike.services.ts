import status from 'http-status';
import { AppError } from '../../errors/AppError';
import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBike = async (payload: TBike) => {
  const data = await Bike.create(payload);
  return data;
};

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any
const retrieveAllBikes = async (query: any) => {
  const data = await Bike.find().select({ createdAt: 0, updatedAt: 0 });
  if (!data || data.length < 1) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }
  return data;
};

const updateBikes = async (id: string, payload: Partial<TBike>) => {
  // check is bike exist?
  const isBikeExist = await Bike.findById(id);

  if (!isBikeExist) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }

  const data = await Bike.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  }).select({ createdAt: 0, updatedAt: 0 });
  return data;
};

const deleteBikes = async (id: string) => {
  const isBikeExist = await Bike.findById(id);

  if (!isBikeExist) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }
  const data = await Bike.findByIdAndDelete(id).select({
    createdAt: 0,
    updatedAt: 0,
  });
  return data;
};

export const bikeServices = {
  createBike,
  retrieveAllBikes,
  updateBikes,
  deleteBikes,
};

// follow this repo [https://github.com/ShariarNiaj05/Bike-Rental-Service]
