import { Router } from 'express';
import { check } from 'express-validator';
import controller from './authController.js';
import authMiddleware from './middleware/authMiddleware.js';

const router = new Router();

router.post('/registration', [
    check('email', 'Email can\'t be empty.').notEmpty(),
    check('password', 'Password must be more than 6 and less than 20 characters.').isLength({ min: 6, max: 20 })
], controller.registration);

router.post('/login', controller.login);
router.get('/users', authMiddleware, controller.getUsers);

export default router;