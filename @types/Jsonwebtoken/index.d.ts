import * as jwt from 'jsonwebtoken';

declare module 'jsonwebtoken' {
  export interface UserJwtPayload extends jwt.JwtPayload {
    userId: String;
    email: String;
    fullName: String;
    phoneNumber: String;
    role: Number;
  }
}
