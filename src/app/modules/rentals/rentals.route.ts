import express from 'express';
import { auth } from '../../utils/authMiddleware';
import { validationRequest } from '../../utils/validateRequest';
import { UserRole } from '../users/users.constants';
import { rentalsController } from './rentals.controller';
import { createRentalsValidationSchema } from './rentals.validation';
const route = express.Router();

route.post(
  '/',
  auth(UserRole.admin, UserRole.user),
  validationRequest(createRentalsValidationSchema),
  rentalsController.createRental,
);

route.get(
  '/',
  auth(UserRole.user, UserRole.admin),
  rentalsController.getAllRentals,
);

route.put('/:id/return', auth(UserRole.admin), rentalsController.returnBike);

export const rentalsRoute = route;
