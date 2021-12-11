import { Router } from 'express';
import controller from '../controllers/usersController.js';

const router = new Router();

router.get('/', controller.getUsers);
router.get('/:username', controller.getUserInfo);
router.patch('/:username/budget', controller.addBudget);
// router.delete('/:id/budget', controller.removeBudget);

export default router;