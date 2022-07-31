import { Response } from 'express';

const response = (res: Response, code: number, data: Array<any>) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  res.status(code).json({
    httpCode: code,
    data,
  });

export default response;
