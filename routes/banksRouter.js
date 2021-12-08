import { Router } from 'express';
import controller from '../controllers/banksContorller.js';

const router = new Router();

router.get('/:bank/user/info', controller.getClientInfo);
router.get('/:bank/transactions/:account/:from/:to', controller.getTransactions);
router.get('/:bank/transactions/:account/', controller.getMonthTransactions);

export default router;