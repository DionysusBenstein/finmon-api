import { Router } from 'express';
import controller from '../controllers/usersController.js';

const router = new Router();

router.get('/', controller.getUsers);
router.get('/:username', controller.getUserInfo);
router.patch('/:username/budget', controller.addBudget);
router.delete('/:username/budget/:id', controller.removeBudget);
router.patch('/:username/cryptowallet', controller.addCryptowallet);
router.delete('/:username/cryptowallet/:address', controller.removeCryptowallet);

export default router;