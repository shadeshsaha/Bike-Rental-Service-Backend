import { Router } from 'express'
// import { demoRoute } from '../modules/scratch/scratch.route'
import { AuthRoutes } from '../modules/auth/auth.route'
import { BikeRoutes } from '../modules/bike/bike.route'
import { BookingRoutes } from '../modules/booking/booking.route'
import { UserRoutes } from '../modules/user/user.route'

const router = Router()

const moduleRoutes = [
  /*  {
    path: '/',
    route: demoRoute,
  }, */
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/bikes',
    route: BikeRoutes,
  },
  {
    path: '/rentals',
    route: BookingRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))

export default router
