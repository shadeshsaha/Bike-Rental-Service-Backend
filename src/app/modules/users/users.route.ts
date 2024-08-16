import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserController } from './users.controller';
import { UserValidations } from './users.validation';

const router = express.Router();

router.get('/me', UserController.seeUserProfile);

router.put(
  '/me',
  validateRequest(UserValidations.updateUserValidationSchema),
  UserController.updateUserProfile,
);

export const UserRoutes = router;
