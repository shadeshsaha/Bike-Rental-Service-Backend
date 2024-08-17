import { Router } from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from './users.constants';
import { UserControllers } from './users.controller';

const router = Router();

router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getProfile,
);
router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.updateProfile,
);

export const UserRoutes = router;
