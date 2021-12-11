import { Router } from 'express';

// import authMiddleware from '../middleware/authMiddleware.js';

import banksRouter from './banksRouter.js';
import authRouter from './authRouter.js';
import usersRouter from './usersRouter.js';

const router = new Router();

// router.use('/banks', authMiddleware, banksRouter);
router.use('/banks', banksRouter);
router.use('/auth', authRouter);
router.use('/users', usersRouter);

export default router;