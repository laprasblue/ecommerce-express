import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import handleValidate from '../middleware/handle-validate';
import { createToken } from '../middleware/jwt';
import { LoginAuthScheme } from '../validators/auth.validator';

const authRoute = Router();

// authRoute.get('/', AuthController.handleLogin);
authRoute.post(
  '/login',
  handleValidate(LoginAuthScheme),
  AuthController.handleLogin,
  createToken
);

export default authRoute;
