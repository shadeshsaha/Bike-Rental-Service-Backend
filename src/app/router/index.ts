import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BikeRoutes } from '../modules/bike/bike.route';
import { rentalsRoute } from '../modules/rentals/rentals.route';
import { UserRoutes } from '../modules/users/users.route';

const router = express.Router();

const moduleRoute = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: rentalsRoute,
  },
];

moduleRoute.forEach((r) => router.use(r.path, r.route));
export default router;
