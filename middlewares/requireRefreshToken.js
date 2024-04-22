import jwt from 'jsonwebtoken';
import { tokenVerificationsErrors } from '../utils/tokenManager.js';

export const requireRefreshToken = (req, res, next) => {
    try {
        const refreshTokenCookie = req.cookies.refreshToken;
        if(!refreshTokenCookie) {
            throw new Error('No existe el token en el header');
        }

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH)
        req.uid = uid;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({ error: tokenVerificationsErrors[error.message] });
    }
}