import express from 'express';
import { authRouter } from '../modules/auth/auth.route';
import { bikeRouter } from '../modules/bike/bike.route';
import { rentalsRoute } from '../modules/rentals/rentals.route';
import { userRouter } from '../modules/users/users.route';

const router = express.Router();

const moduleRoute = [
  {
    path: '/auth',
    route: authRouter,
  },
  {
    path: '/users',
    route: userRouter,
  },
  {
    path: '/bikes',
    route: bikeRouter,
  },
  {
    path: '/rentals',
    route: rentalsRoute,
  },
];

moduleRoute.forEach((r) => router.use(r.path, r.route));
export default router;
