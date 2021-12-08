import { Router } from 'express';
import controller from '../controllers/banksContorller.js';

const router = new Router();

router.get('/', async (req, res) => {
    res.send(`
      <body style="font-family: Arial; text-align: center">
        <h1>Docs will be here! v${process.env.npm_package_version}</h1>
        <div style="display: flex; justify-content: center;">
          <img src="https://raw.githubusercontent.com/DionysusBenstein/Hasbik/master/hasbik.jpg">
        </div>
      </body>
    `);
});

router.get('/:bank/user/info', controller.getClientInfo);
router.get('/:bank/transactions/:account/:from/:to', controller.getTransactions);
router.get('/:bank/transactions/:account/', controller.getMonthTransactions);

export default router;