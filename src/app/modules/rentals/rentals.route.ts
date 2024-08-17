import express from 'express';
import { rentalsController } from './rentals.controller';
import { validationRequest } from '../../utils/validate.request';
import { createRentalsValidationSchema } from './rentals.validation';
import { auth } from '../../utils/authMiddleware';
import { UserRole } from '../users/users.constants';
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
