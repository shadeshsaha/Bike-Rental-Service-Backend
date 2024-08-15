import express from 'express';
import { authMiddleware } from '../../utils/authMiddleware';
import { validationRequest } from '../../utils/validateRequest';
import { UserRole } from '../users/users.constants';
import { rentalsController } from './rentals.controller';
import { createRentalsValidationSchema } from './rentals.validation';
const route = express.Router();

route.post(
  '/',
  // authMiddleware(UserRole.admin, UserRole.user),
  validationRequest(createRentalsValidationSchema),
  rentalsController.createRental,
);

route.get(
  '/',
  // authMiddleware(UserRole.user, UserRole.admin),
  rentalsController.getAllRentals,
);

route.put(
  '/:id/return',
  authMiddleware(UserRole.admin),
  rentalsController.returnBike,
);

export const rentalsRoute = route;
