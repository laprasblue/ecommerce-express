import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { ObjectSchema } from 'joi';

function bodyValidator(schema: ObjectSchema) {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return next(createHttpError(400, error.details[0].message));
    }
    return next();
  };
}

export default bodyValidator;
