// middleware/errorHandlingMiddleware.ts
import { NextFunction, Request, Response } from 'express';

const errorHandlingMiddleware = (
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    if (res.headersSent) {
        console.error('Error occurred after headers were sent:', err);
        return res;
    }

    if (err instanceof Error) {
        return res.status(500).json({ error: err.message });
    }

    return res.status(500).json({ error: 'An unexpected error occurred' });
};

export default errorHandlingMiddleware;
