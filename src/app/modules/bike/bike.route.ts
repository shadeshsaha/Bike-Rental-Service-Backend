import { Router } from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validateRequest';
import { USER_ROLE } from '../users/users.constants';
import { BikeControllers } from './bike.controller';
import { BikeValidation } from './bike.validation';

const router = Router();

router.get('/', BikeControllers.getAllBike);
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidation.bikeValidationSchema),
  BikeControllers.createBike,
);

router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidation.updateBikeValidationSchema),
  BikeControllers.updateBike,
);
router.delete('/:id', auth(USER_ROLE.admin), BikeControllers.deleteBike);

export const BikeRoutes = router;
