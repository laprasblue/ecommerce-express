import { Router } from 'express';
import UserController from '../controllers/user.controller';
import bodyValidator from '../middleware/body-validator';
import { verifyToken } from '../middleware/jwt';
import {
  CreateUserScheme,
  DisableUserScheme,
  ResetPasswordScheme,
  UpdateUserScheme,
} from '../validators/user.validator';

const userRoute = Router();

userRoute.get('/', verifyToken, UserController.getUser);
userRoute.post(
  '/',
  bodyValidator(CreateUserScheme.body),
  UserController.createUser
);
userRoute.put(
  '/',
  verifyToken,
  bodyValidator(UpdateUserScheme.body),
  UserController.updateUser
);

userRoute.put(
  '/reset-password',
  verifyToken,
  bodyValidator(ResetPasswordScheme.body),
  UserController.resetPassword
);
userRoute.delete(
  '/',
  verifyToken,
  bodyValidator(DisableUserScheme.body),
  UserController.disableUser
);

export default userRoute;
