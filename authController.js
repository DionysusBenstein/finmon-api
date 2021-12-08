import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import secretKey from './config.js';

function generateAccessToken(id, plan) {
    const { secret } = secretKey;    
    const payload = {
        id,
        plan
    };

    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error', errors });
            }

            const { email, password, plan } = req.body;
            const candidate = await User.findOne({ email });

            if (candidate) {
                return res.status(400).json({ message: 'Email already exist' });
            }

            const hashPassword = bcrypt.hashSync(password,  );
            const user = new User({ email, password: hashPassword, plan });

            await user.save();
            return res.json({ message: 'Registration success!' });
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });

            if (!user) {
                return res.status(400).json({message: `User with email ${email} not found.`});
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = generateAccessToken(user._id, user.plan);

            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new authController;