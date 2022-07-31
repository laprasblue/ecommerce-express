import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import createHttpError from 'http-errors';
import router from './routes';

const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1', router);

app.use((req, res, next) => {
  next(createHttpError(404, 'Not Found'));
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  res.status(err.status || 500).json({
    statusCode: err.status || 500,
    errMsg: err.message,
  });
});

export default app;
