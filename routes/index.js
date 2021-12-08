import { Router } from 'express';

import authMiddleware from '../middleware/authMiddleware.js';

import banksRouter from './banksRouter.js';
import authRouter from './authRouter.js';

const router = new Router();

router.use('/banks', authMiddleware, banksRouter);
router.use('/auth', authRouter);

export default router;