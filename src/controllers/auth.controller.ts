import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import UserService from '../services/user.service';

const AuthController = {
  async handleLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    try {
      const user = await UserService.findOneUser(email);

      if (!user || user === null) {
        return next(createHttpError(400, 'Email/password is incorrect'));
      }

      const isMatch = await user.isCheckPassword?.(password);
      if (!isMatch) {
        return next(createHttpError(400, 'Email/password is incorrect'));
      }
      req.user = {
        userId: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        phoneNumber: user.phoneNumber,
      };
      return next();
    } catch (error) {
      res.locals.error = error;
      return next();
    }
  },
};

export default AuthController;
