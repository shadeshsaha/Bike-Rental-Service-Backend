import status from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/sendResponse';
import { rentalsServices } from './rentals.services';

const createRental = catchAsync(async (req, res) => {
  const body = req.body;
  const user = req.user;
  const data = await rentalsServices.createRentals(user?.email, body);
  successResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Rental created successfully',
    data,
  });
});

const getAllRentals = catchAsync(async (req, res) => {
  const user = req.user;
  const data = await rentalsServices.retrieveRentals(user?.email);

  successResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Rentals retrieved successfully',
    data,
  });
});

const returnBike = catchAsync(async (req, res) => {
  const { id } = req.params;

  const data = await rentalsServices.returnBike(id);

  successResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Bike returned successfully',
    data,
  });
});

export const rentalsController = { createRental, getAllRentals, returnBike };
