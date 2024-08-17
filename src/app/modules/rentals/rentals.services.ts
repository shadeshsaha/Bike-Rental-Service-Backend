import { startSession } from 'mongoose';
import status from 'http-status';
import { Bike } from '../bike/bike.model';
import { TRentals } from './rentals.interface';
import { rentals } from './rentals.model';
import { AppError } from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';
import { userModel } from '../users/users.model';

const createRentals = async (email: JwtPayload, payload: TRentals) => {
  const session = await startSession();
  // get specific user
  const user = await userModel.findOne({ email: email });

  // if user not exist
  if (!user) {
    throw new AppError(
      status.UNAUTHORIZED,
      'You are unauthorized, Please sign up',
    );
  }

  // check is startTime same to previous rentals startTime
  const existingRentalBikes = await rentals.findOne({
    startTime: payload.startTime,
    userId: user?._id,
  });

  // check the users rentals is not return

  const existingRentalNotReturnYet = await rentals.findOne({
    userId: user?._id,
    isReturned: false,
  });

  //  if startTime same to previous rentals startTime.
  // if users previous rentals is not return.
  if (
    (existingRentalBikes && existingRentalBikes?.isReturned == false) ||
    existingRentalNotReturnYet
  ) {
    throw new AppError(
      status.BAD_REQUEST,
      "You are already renting a bike but you didn't return, Before renting a new bike you have to return your previous bike!",
    );
  }

  try {
    session.startTransaction();

    payload.userId = user?._id;

    const data = await rentals.create([payload], { session });

    if (!data) {
      throw new AppError(status.BAD_REQUEST, 'Rental created failed!');
    }

    const updateBike = await Bike.findByIdAndUpdate(
      payload.bikeId,
      { isAvailable: false },
      { new: true, runValidators: true, session },
    );
    if (!updateBike) {
      throw new AppError(status.BAD_REQUEST, 'Bike update failed!');
    }
    await session.commitTransaction();
    session.endSession();
    return data;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(status.BAD_REQUEST, 'Rental create failed!');
  }
};

const returnBike = async (id: string) => {
  // find current rentals
  const currentRentals = await rentals.findById(id);
  const bikeId = currentRentals?.bikeId;

  if (!currentRentals) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }

  //   find bike by id
  const rentalsBike = await Bike.findById(bikeId);

  if (!rentalsBike) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }

  const pricePerHour = rentalsBike?.pricePerHour;
  const startTime = new Date(currentRentals?.startTime as Date);

  //  current time
  const returnTime = new Date();
  // hours of rent
  const differenceTime = returnTime.getTime() - startTime.getTime();
  const differenceInHours = (differenceTime / (1000 * 60 * 60)).toFixed(2);

  //   total cost
  const totalCost = (Number(differenceInHours) * Number(pricePerHour)).toFixed(
    2,
  );

  const session = await startSession();

  try {
    session.startTransaction();
    const updateRental = await rentals
      .findByIdAndUpdate(
        id,
        { returnTime, totalCost, isReturned: true },
        { new: true, runValidators: true, session },
      )
      .select({ createdAt: 0, updatedAt: 0 });

    if (!updateRental) {
      throw new AppError(status.BAD_REQUEST, 'Rental update failed!');
    }

    const isAvailableUpdate = await Bike.findByIdAndUpdate(
      currentRentals?.bikeId,
      { isAvailable: true },
      { new: true, runValidators: true, session },
    );

    if (!isAvailableUpdate) {
      throw new AppError(
        status.BAD_REQUEST,
        'Bike availability update failed!',
      );
    }

    await session.commitTransaction();
    session.endSession();

    return updateRental;
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw new AppError(status.BAD_REQUEST, 'Return rental failed!');
  }
};

const retrieveRentals = async (email: JwtPayload) => {
  const user = await userModel.findOne({ email: email });
  if (!user) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }

  const data = await rentals
    .find({ userId: user?._id })
    .select({ createdAt: 0, updatedAt: 0 });
  if (!data || data.length < 1) {
    throw new AppError(status.NOT_FOUND, 'No Data Found');
  }
  return data;
};
export const rentalsServices = { createRentals, returnBike, retrieveRentals };
