import httpStatus from 'http-status';
import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentalsServices } from './rentals.services';

const createRental = catchAsync(async (req, res) => {
  const payload = {
    rentalInformation: req.body,
    authUserInformation: req.user,
  };
  const result = await RentalsServices.createRentalIntoDB(payload);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
});

const getAllRentalsForUser = catchAsync(async (req, res) => {
  const result = await RentalsServices.getAllRentalsForUserFromDB(
    req.user as JwtPayload,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});

const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await RentalsServices.returnBikeIntoDB(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Bike returned successfully',
    data: result,
  });
});

export const RentalsController = {
  createRental,
  returnBike,
  getAllRentalsForUser,
};
