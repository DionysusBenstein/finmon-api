import User from './models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
// const { secret } = require("./config")

function generateAccessToken(id, plans) {
    const payload = {
        id,
        plans
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

            const { username, password } = req.body;
            const candidate = await User.findOne({username});

            if (candidate) {
                return res.status(400).json({ message: 'Username already exist' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const userPlan = await Plan.findOne({value: "USER"});
            const user = new User({ username, password: hashPassword, Plans: [userPlan.value] });

            await user.save();
            return res.json({ message: 'Registration success!' });
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const { username, password } = req.body;
            const user = await User.findOne({username});

            if (!user) {
                return res.status(400).json({message: `User ${username} not found`});
            }

            const validPassword = bcrypt.compareSync(password, user.password);

            if (!validPassword) {
                return res.status(400).json({ message: 'Invalid password' });
            }

            const token = generateAccessToken(user._id, user.Plans);

            return res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(400).json({ message: 'Login error' });
        }
    }

    async getUsers(req, res) {
        try {
            const user = new User();
            await user.save();

            // const users = await User.find();
            // res.json(users);
        } catch (e) {
            console.log(e);
        }
    }
}

export default new authController;