// eslint-disable-next-line @typescript-eslint/no-unused-vars
import express from 'express';
import { AccountJwtPayload, UserJwtPayload } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      decode?: UserJwtPayload;
      token?: string;
      refreshToken?: string;
      user?: UserJwtPayload;
    }
  }
}
