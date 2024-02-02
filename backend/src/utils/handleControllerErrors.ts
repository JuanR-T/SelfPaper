import { Response } from 'express';

export const handleControllerErrors = (
    err: unknown,
    res: Response,
    defaultErrorMessage: String,
): Response => {
    if (res.headersSent) {
        console.error('Error occurred after headers were sent:', err);
        return res;
    }
    if (err instanceof Error)
        return res.status(500).json({ error: err.message });
    return res.status(500).json({ error: defaultErrorMessage });
};
