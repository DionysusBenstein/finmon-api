import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { validationResult } from 'express-validator';
import secretKey from '../config.js';

function generateAccessToken(id, plan) {
    const { secret } = secretKey;    
    const payload = { id, plan };

    return jwt.sign(payload, secret, { expiresIn: '24h' });
}

class authController {
    async registration(req, res) {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ message: 'Registration error', errors });
            }

            const { username, email, password, plan, budgets } = req.body;
            const candidateEmail = await User.findOne({ email });

            if (candidateEmail) {
                return res.status(400).json({ message: 'Email already taken' });
            }

            const candidateUsername = await User.findOne({ username });

            if (candidateUsername) {
                return res.status(400).json({ message: 'Username already exist' });
            }

            const hashPassword = bcrypt.hashSync(password, 7);
            const user = new User({ username, email, password: hashPassword, plan, budgets });

            await user.save();
            return res.json({ message: 'Registration success!' });
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const { login, password } = req.body;
            const user = await User.findOne({$or: [{username: login}, {email: login}]});
                       
            if (!user) {
                return res.status(400).json({message: `User ${login} not found.`});
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

    // TODO: this shit
    async forgotPassword(req, res) {
        async.waterfall(
            [
                function (done) {
                    crypto.randomBytes(20, function (err, buf) {
                        var token = buf.toString('hex');
                        done(err, token);
                    });
                },
                function (token, done) {
                    User.findOne({ email: req.body.email }, function (err, user) {
                        if (!user) {
                            req.flash(
                                'error',
                                'No account with that email address exists.'
                            );
                            return res.redirect('/forgot');
                        }
        
                        user.resetPasswordToken = token;
                        user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
        
                        user.save(function (err) {
                            done(err, token, user);
                        });
                    });
                },
                function (token, user, done) {
                    var smtpTransport = nodemailer.createTransport('SMTP', {
                        service: 'Gmail', // se puede usar cualquier otro servicio soportado por nodemailer, see nodemailer support mail SMTP
                        auth: {
                            user: 'Introducir direccion de mail saliente', //email from
                            pass: 'introducir contraseña', //password
                        },
                    });
                    var mailOptions = {
                        to: user.email,
                        from: 'passwordreset@demo.com',
                        subject: 'Node.js Password Reset',
                        text:
                            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                            'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                            'http://' +
                            req.headers.host +
                            '/reset/' +
                            token +
                            '\n\n' +
                            'If you did not request this, please ignore this email and your password will remain unchanged.\n',
                    };
                    smtpTransport.sendMail(mailOptions, function (err) {
                        req.flash(
                            'info',
                            'An e-mail has been sent to ' +
                                user.email +
                                ' with further instructions.'
                        );
                        done(err, 'done');
                    });
                },
            ],
            function (err) {
                if (err) return next(err);
                res.redirect('/forgot');
            }
        );
        
    }

    async resetPassword(req, res) {
        User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
            if (!user) {
                req.flash('error', 'Password reset token is invalid or has expired.');
                return res.redirect('/forgot');
            }
            res.render('reset', {
                user: req.user
            });
        });
    }
}

export default new authController;