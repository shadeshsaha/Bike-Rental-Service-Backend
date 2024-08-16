import httpStatus from 'http-status';
import { AppError } from '../../errors/AppError';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.services';

// * create a bike controller (admin)
const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBikeInDatabase(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Bike added successfully',
    result,
  });
});

// * get all bike controller
const getAllBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBikesFromDatabase();
  if (!result.length) {
    throw new AppError(httpStatus.NOT_FOUND, 'No data found');
  }
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Bikes retrieved successfully',
    result,
  });
});
// * update a bike controller (admin)
const updateBike = catchAsync(async (req, res) => {
  const result = await BikeServices.updateBikeFromDatabase(
    req.params.id,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Bike updated successfully',
    result,
  });
});

// * delete a bike controller (admin)
const deleteBike = catchAsync(async (req, res) => {
  const result = await BikeServices.deleteASingleBikeFromDatabase(
    req.params.id,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Bike deleted successfully',
    result,
  });
});

export const BikeController = {
  createBike,
  getAllBike,
  updateBike,
  deleteBike,
};
