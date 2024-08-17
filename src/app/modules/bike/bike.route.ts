import express from 'express';
import { bikeControllers } from './bike.controller';
import { validationRequest } from '../../utils/validate.request';
import {
  createBikeValidationSchema,
  updateBikeValidationSchema,
} from './bike.validation';
import { auth } from '../../utils/authMiddleware';
import { UserRole } from '../users/users.constants';
const route = express.Router();

route.post(
  '/',
  auth(UserRole.admin),
  validationRequest(createBikeValidationSchema),
  bikeControllers.createBike,
);

route.get('/', bikeControllers.retrieveAllBike);

route.put(
  '/:id',
  auth(UserRole.admin),
  validationRequest(updateBikeValidationSchema),
  bikeControllers.updateBike,
);

route.delete('/:id', auth(UserRole.admin), bikeControllers.deleteBike);

export const bikeRouter = route;
