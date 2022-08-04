import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ObjectSchema } from 'joi';

function paramValidator(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.params);
    console.log(error);
    if (error) {
      return next(
        createHttpError(400, `parameter ${error.details[0].message}`)
      );
    }
    return next();
  };
}

export default paramValidator;
