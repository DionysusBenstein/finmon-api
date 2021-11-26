import { Router } from 'express';
import { check } from 'express-validator';
import controller from './authController.js';

const router = new Router();

router.post('/registration', [
    check('email', "Enter email").notEmpty(),
    check('password', "Пароль должен быть больше 6 и меньше 10 символов").isLength({ min: 6, max: 10 })
], controller.registration)
router.post('/login', controller.login)
// router.get('/users', controller.getUsers)

export default router;