import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const verifyToken =
    //(requireAuth: boolean) =>
    (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        // if (!requireAuth) {
        //     return next();
        // }

        if (!token) {
            return res.status(401).json({ message: 'No token provided' });
        }

        const jwtSecret = process.env.JWT_SECRET_KEY;
        //console.log("the jwt key : ", jwtSecret)
        if (!jwtSecret) {
            console.error('JWT_SECRET is not defined in environment variables');
            return res.status(500).json({ message: 'Internal server error' });
        }

        try {
            const decoded = jwt.verify(token, jwtSecret as string);
            console.log('decodedToken', decoded);
            if (decoded) {
                next();
            }
        } catch (error) {
            res.status(401).json({
                message: 'Unauthorized: Token is invalid or expired',
            });
        }
    };

export default verifyToken;
