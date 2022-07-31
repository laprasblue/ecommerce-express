import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { UserJwtPayload, sign, verify } from 'jsonwebtoken';
import response from '../constants/common/response';
import { ETokenExpired } from '../constants/enums/EExpired';
import EResponseCode from '../constants/enums/EResponseCode';

export const createToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userId, email, fullName, phoneNumber, role } = req.user || {};
  try {
    const token = await sign(
      {
        userId,
        email,
        fullName,
        role,
        phoneNumber,
      },
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: ETokenExpired.TOKEN,
      }
    );
    return response(res, EResponseCode.OK, [
      { msg: 'Login successfully', token },
    ]);
  } catch (error) {
    res.locals.error = error;
    return next();
  }
};

export const verifyToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization || '';
    const token = authHeader && authHeader.split(' ')[1];
    if (token === null || token === '') {
      return next(createHttpError(EResponseCode.UNAUTHORIZED, 'Unauthorized'));
    }
    req.token = token;
    req.decode = (await verify(
      req.token || '',
      process.env.ACCESS_TOKEN_SECRET!
    )) as UserJwtPayload;
    return next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return next(createHttpError(EResponseCode.UNAUTHORIZED, 'Token expired'));
    }
    return next(createHttpError(EResponseCode.UNAUTHORIZED, 'Unauthorized'));
  }
};
