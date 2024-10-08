import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import mongoose from 'mongoose';
import AppError from '../../errors/AppError';
import { Bike } from '../bike/bike.model';
import { User } from '../user/user.model';
import { Booking } from './booking.model';

const createRentalIntoDB = async (payload: {
  authUserInformation: any;
  rentalInformation: any;
}) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const { authUserInformation, rentalInformation } = payload;
    // checking is tokenize user role is admin
    if (authUserInformation.role === 'admin') {
      throw new AppError(httpStatus.UNAUTHORIZED, "Admin can't rent a bike");
    }

    // checking if tokenize user exist or not
    const isUserExist = await User.findOne({
      email: authUserInformation.email,
    });
    if (!isUserExist) {
      throw new AppError(httpStatus.UNAUTHORIZED, "User didn't  matched");
    }
    // checking if requested bike is exist
    const bikeId = rentalInformation.bikeId;
    const isBikeExist = await Bike.findById({ _id: bikeId });
    if (!isBikeExist) {
      throw new AppError(httpStatus.BAD_REQUEST, "Requested bike isn't found");
    }
    if (isBikeExist.isAvailable !== true) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        "Currently bike isn't available to rent",
      );
    }
    const userId = isUserExist.id;
    console.log({ userId }, { bikeId });

    const newBookingInformation = {
      userId,
      bikeId: rentalInformation.bikeId,
      startTime: rentalInformation.startTime,
    };
    // updating bike isAvailable status to false
    await Bike.findByIdAndUpdate(
      bikeId,
      { isAvailable: false },
      {
        new: true,
        runValidators: true,
      },
    );

    await session.commitTransaction();
    await session.endSession();

    const result = await Booking.create(newBookingInformation);
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Failed to Rent a bike ${error}`,
    );
  }
};

const getAllRentalsForUserFromDB = async (requestHeader: JwtPayload) => {
  try {
    const { email } = requestHeader;
    const userInfo = await User.findOne({ email: email });
    const id = userInfo?.id;
    const result = await Booking.find({ userId: id });
    return result;
  } catch (error) {
    throw new AppError(httpStatus.BAD_REQUEST, 'Rental retrieved failed');
  }
};

const returnBikeIntoDB = async (id: string) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const rentInfo = await Booking.findById(id).populate('bikeId');

    if (!rentInfo) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Rental not found');
    }

    if (rentInfo.isReturned === true) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Bike Has been already returned',
      );
    }
    const currentTime: any = new Date();

    // Calculate rental duration and cost
    const rentDurationInHours = Math.ceil(
      (currentTime - (rentInfo.startTime as any)) / (1000 * 60 * 60),
    );

    console.log('rentInfo: ', rentInfo);
    const costPerHour = rentInfo?.bikeId?.pricePerHour;
    const totalCost = rentDurationInHours * costPerHour; // Calculated based on rental duration

    // Update rental record
    rentInfo.returnTime = currentTime; // Current time when returning the bike
    rentInfo.totalCost = totalCost;
    rentInfo.isReturned = true;

    console.log('sfddddd', rentInfo.bikeId);
    // changing bike available status from false to true
    const bikeIsAvailable = await Bike.findByIdAndUpdate(
      rentInfo.bikeId._id,
      {
        isAvailable: true,
      },
      { new: true },
    );
    console.log({ bikeIsAvailable });
    rentInfo.bikeId = bikeIsAvailable;
    await rentInfo.save();

    await session.commitTransaction();
    await session.endSession();
    console.log('last rentInfo', rentInfo);
    const result = rentInfo;
    return result;
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Failed to Return bike ${error}`,
    );
  }
};

export const BookingServices = {
  createRentalIntoDB,
  returnBikeIntoDB,
  getAllRentalsForUserFromDB,
};
