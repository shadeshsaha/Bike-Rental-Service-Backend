import express from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import validateRequest from '../../middleware/validateRequest';
import { BookingController } from './rentals.controller';
import { BookingValidations } from './rentals.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(BookingValidations.createRentalBikeValidation),
  BookingController.boookingABike,
);
router.get('/', BookingController.myRentals);

router.put(
  '/:id/return',
  authMiddleware('admin'),
  BookingController.returnBike,
);

export const rentalsRoute = router;
