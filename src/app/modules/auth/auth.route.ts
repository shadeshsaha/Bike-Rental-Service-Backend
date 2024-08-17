import express from 'express';
import { authController } from './auth.controller';
import { validationRequest } from '../../utils/validate.request';
import { createUserSignInValidationSchema } from '../users/users.validation';
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
