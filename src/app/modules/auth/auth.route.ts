import { Router } from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { UserValidation } from '../user/user.validation'
import { AuthController } from './auth.controller'
import { AuthValidation } from './auth.validation'
// import auth from '../../middlewares/auth'
// import { USER_ROLE } from '../user/user.constant'

const router = Router()

router.post(
  '/signup',
  validateRequest(UserValidation.userValidationSchema),
  AuthController.createUser,
)

router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthController.loginUser,
)

export const AuthRoutes = router
