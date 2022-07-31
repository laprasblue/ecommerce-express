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
      console.log(req.user);
      const user = await UserService.findOneUser(req.decode!.email);
      return response(res, 200, [{ ...user!.toObject(), password: undefined }]);
    } catch (error) {
      res.locals.error = error;
      return next();
    }
  },
  async updateUser(req: Request, res: Response, next: NextFunction) {
    // const { username, password } = req.body;
    return res.sendStatus(200);
  },
  async disableUser(req: Request, res: Response, next: NextFunction) {
    // const { username, password } = req.body;
    return res.sendStatus(200);
  },
};

export default UserController;
