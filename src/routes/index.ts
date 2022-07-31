import { Router } from 'express';
import handleError from '../middleware/handle-error';
import authRoute from './auth.route';
import userRoute from './user.route';

const router = Router();
router.use('/auth', authRoute, handleError);
router.use('/user', userRoute, handleError);

export default router;
