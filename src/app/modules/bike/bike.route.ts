import express from 'express';
import { auth } from '../../utils/authMiddleware';
import { UserRole } from '../users/users.constants';
import { bikeControllers } from './bike.controller';
const route = express.Router();

route.post(
  '/',
  auth(UserRole.admin),

  bikeControllers.createBike,
);

route.get('/', bikeControllers.getAllBikes);

export const bikeRouter = route;
