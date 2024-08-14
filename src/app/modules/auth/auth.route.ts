import express from 'express';
import { validationRequest } from '../../utils/validateRequest';
import { createUserSignInValidationSchema } from '../users/users.validation';
import { authController } from './auth.controller';
import { userLoginValidationSchema } from './auth.validation';
const route = express.Router();

route.post(
  '/signup',
  validationRequest(createUserSignInValidationSchema),
  authController.signUpUser,
);
route.post(
  '/login',
  validationRequest(userLoginValidationSchema),
  authController.loginUser,
);

export const authRouter = route;
