import { Router } from 'express';
import AuthController from '../controllers/auth.controller';
import bodyValidator from '../middleware/body-validator';
import { createToken } from '../middleware/jwt';
import { LoginAuthScheme } from '../validators/auth.validator';

const authRoute = Router();

// authRoute.get('/', AuthController.handleLogin);
authRoute.post(
  '/login',
  bodyValidator(LoginAuthScheme.body),
  AuthController.handleLogin,
  createToken
);

export default authRoute;
