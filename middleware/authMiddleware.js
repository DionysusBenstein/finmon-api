import jwt from 'jsonwebtoken';
import secretKey from '../config.js';

export default (req, res, next) => {
    if (req.method === 'OPTIONS') {
        next();
    }

    try {
        const { secret } = secretKey;
        const token = req.headers.authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({ message: 'User not logged in' });
        }

        // TODO: Generate jwt from username
        // const userId = getUserIdFromJwt();
        // if (!userId.equals("some user id")) {
        //  throw new HttpUnauthorizedException("You do not have access to edit" + 
        //  "this resource.");
        // }

        const decodedData = jwt.verify(token, secret);
        req.user = decodedData;
        next();
    } catch (e) {
        console.log(e);
        return res.status(403).json({ message: 'User not logged in' });
    }
};

