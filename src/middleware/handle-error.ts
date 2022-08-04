import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

const handleError = (req: Request, res: Response, next: NextFunction) => {
  const { error } = res.locals;
  if (error === undefined) return next();
  if (res.locals.error?.name === 'MongoServerError') {
    return next(
      createHttpError(
        400,
        `${Object.keys(error.keyPattern).join(', ') || 'field'} is used`
      )
    );
  }
  console.log(error);
  return next(createHttpError(500, 'Something wrong...'));
};

export default handleError;
