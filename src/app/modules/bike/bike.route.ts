import e from 'express';
import { authMiddleware } from '../../middleware/authMiddleware';
import validateRequest from '../../middleware/validateRequest';
import { BikeController } from './bike.controller';
import { BikeValidations } from './bike.validation';

const router = e.Router();

router.post(
  '/',
  authMiddleware('admin'),
  validateRequest(BikeValidations.createBikeValidationSchema),
  BikeController.createBike,
);
router.get('/', BikeController.getAllBike);

router.put(
  '/bikes/:id',
  authMiddleware('admin'),
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeController.updateBike,
);

router.delete('/bikes/:id', authMiddleware('admin'), BikeController.deleteBike);

export const BikeRoutes = router;
