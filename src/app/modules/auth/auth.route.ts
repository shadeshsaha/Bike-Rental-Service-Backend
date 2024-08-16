import e from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidations } from '../users/users.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = e.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.signUp,
);
router.post(
  '/login',
  validateRequest(AuthValidations.loginAuth),
  AuthControllers.login,
);

export const AuthRoutes = router;
