import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../users/users.constants';
import { RentalsController } from './rentals.controller';

const router = Router();

router.post('/', auth(USER_ROLE.user), RentalsController.createRental);
router.get('/', auth(USER_ROLE.user), RentalsController.getAllRentalsForUser);
router.put('/:id/return', auth(USER_ROLE.admin), RentalsController.returnBike);

export const rentalsRoute = router;
