import { Router } from 'express';
import { check } from 'express-validator';
import controller from '../controllers/authController.js';

const router = new Router();

router.post('/registration', [
    check('email', 'Email can\'t be empty.').notEmpty(),
    check('password', 'Password must be more than 6 and less than 20 characters.').isLength({ min: 6, max: 20 })
], controller.registration);

router.post('/login', controller.login);
router.post('/forgot', controller.forgotPassword);
router.post('/reset', controller.resetPassword);

export default router;