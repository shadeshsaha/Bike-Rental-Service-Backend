import express from 'express';
import { auth } from '../../utils/authMiddleware';
import { validationRequest } from '../../utils/validateRequest';
import { UserRole } from '../users/users.constants';
import { bikeControllers } from './bike.controller';
import {
  createBikeValidationSchema,
  updateBikeValidationSchema,
} from './bike.validation';

const route = express.Router();

route.post(
  '/',
  auth(UserRole.admin),
  validationRequest(createBikeValidationSchema),
  bikeControllers.createBike,
);

route.get('/', bikeControllers.getAllBikes);

route.put(
  '/:id',
  auth(UserRole.admin),
  validationRequest(updateBikeValidationSchema),
  bikeControllers.updateBike,
);

route.delete('/:id', auth(UserRole.admin), bikeControllers.deleteBike);

export const bikeRouter = route;
