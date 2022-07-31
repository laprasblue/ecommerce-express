import { Router } from 'express';
import UserController from '../controllers/user.controller';
import handleValidate from '../middleware/handle-validate';
import { verifyToken } from '../middleware/jwt';
import {
  CreateUserScheme,
  UpdateUserScheme,
} from '../validators/user.validator';

const userRoute = Router();

userRoute.get('/', verifyToken, UserController.getUser);
userRoute.post(
  '/',
  handleValidate(CreateUserScheme),
  UserController.createUser
);
userRoute.put(
  '/',
  handleValidate(UpdateUserScheme),
  verifyToken,
  UserController.updateUser
);
userRoute.delete('/', verifyToken, UserController.disableUser);

export default userRoute;
