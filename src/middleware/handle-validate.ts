import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ObjectSchema } from 'joi';

function handleValidate(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error?.details[0].path.includes('password')) {
      next(
        createHttpError(
          400,
          'Password must have at least 8 characters. Having 1 special character, 1 uppercase character (A-Z) and 1 digit (0-9) '
        )
      );
    }
    if (error) {
      next(createHttpError(400, error.details[0].message));
    }
    return next();
  };
}

export default handleValidate;
