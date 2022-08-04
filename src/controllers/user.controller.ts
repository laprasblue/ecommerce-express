import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import response from '../constants/common/response';
import EResponseCode from '../constants/enums/EResponseCode';
import UserService from '../services/user.service';

const UserController = {
  async createUser(req: Request, res: Response, next: NextFunction) {
    const { password, email, phoneNumber, fullName } = req.body;
    try {
      const user = await UserService.createUser({
        email,
        fullName,
        password,
        phoneNumber,
      });
      return response(res, EResponseCode.CREATED, [
        { ...user.toObject(), password: undefined },
      ]);
    } catch (error) {
      res.locals.error = error;
      return next();
    }
  },
  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.findOneUser(req.decode!.email);
      return response(res, 200, [{ ...user!.toObject(), password: undefined }]);
    } catch (error) {
      res.locals.error = error;
      return next();
    }
  },
  async updateUser(req: Request, res: Response, next: NextFunction) {
    const { fullName } = req.body;
    try {
      const user = await UserService.updateUser({
        fullName,
        email: req.decode!.email,
      });

      if (!user) {
        return next(createHttpError(401, 'Token invalid'));
      }

      return response(res, EResponseCode.OK, [
        {
          msg: 'Updated',
          user: { ...user!.toObject(), fullName, password: undefined },
        },
      ]);
    } catch (error) {
      res.locals.error = error;
      return next();
    }
  },
  async disableUser(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;
    try {
      const user = await UserService.findOneUser(req.decode!.email);

      if (!user) {
        return next(createHttpError(401, 'Token invalid'));
      }

      if (!(await user.isCheckPassword(password))) {
        return next(createHttpError(400, 'the password is incorrect'));
      }

      await UserService.disableUser(req.decode!.email);
      return response(res, 200, [
        {
          msg: `User ${req.decode!.userId} was disable`,
        },
      ]);
    } catch (error) {
      res.locals.error = error;
      return next();
    }
  },

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    const { oldPassword, newPassword } = req.body;
    if (oldPassword === newPassword) {
      return next(
        createHttpError(400, 'the new password must not same the old password')
      );
    }
    try {
      const user = await UserService.findOneUser(req.decode!.email);
      if (!user) {
        return next(createHttpError(401, 'Token invalid'));
      }
      if (!(await user.isCheckPassword(oldPassword))) {
        return next(createHttpError(400, 'Old password is incorrect'));
      }
      const newUser = await UserService.resetPassword({
        email: req.decode!.email,
        password: newPassword,
      });
      return response(res, 200, [
        {
          msg: 'Reset password successfully',
          user: { ...newUser!.toObject(), password: undefined },
        },
      ]);
    } catch (error) {
      res.locals.error = error;
      return next();
    }
  },
};

export default UserController;
