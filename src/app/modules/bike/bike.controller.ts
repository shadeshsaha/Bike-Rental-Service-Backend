import status from 'http-status';
import { catchAsync } from '../../utils/catchAsync';
import successResponse from '../../utils/successResponse';
import { bikeServices } from './bike.services';

const createBike = catchAsync(async (req, res) => {
  console.log('Req, Res:', req, res);
  const body = req.body;
  console.log('body:', body);
  const data = await bikeServices.createBike(body);

  successResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Bike added successfully!',
    data,
  });
});

const getAllBikes = catchAsync(async (req, res) => {
  const data = await bikeServices.getAllBikes(req.query);
  console.log('data:', data);

  successResponse(res, {
    statusCode: status.OK,
    success: true,
    message: 'Bikes retrieved successfully',
    data,
  });
});

export const bikeControllers = {
  createBike,
  getAllBikes,
};
