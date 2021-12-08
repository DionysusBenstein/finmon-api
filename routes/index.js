import { Router } from 'express';

import banksRouter from './banksRouter.js';
import authRouter from './authRouter.js';

const router = new Router();

router.use('/', banksRouter);
router.use('/auth', authRouter);

export default router;