import express from 'express';
import { auth } from '../../utils/authMiddleware';
import { validationRequest } from '../../utils/validateRequest';
import { UserRole } from './users.constants';
import { userControllers } from './users.controller';
import { updateUserSignInValidationSchema } from './users.validation';
const route = express.Router();

route.get(
  '/me',
  auth(UserRole.admin, UserRole.user),
  userControllers.retrieveUser,
);

route.put(
  '/me',
  auth(UserRole.admin, UserRole.user),
  validationRequest(updateUserSignInValidationSchema),
  userControllers.updateSingleUser,
);
export const userRouter = route;
