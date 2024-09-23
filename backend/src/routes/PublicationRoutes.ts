import express from 'express';

import {
    createPublication,
    deletePublication,
    getPublication,
    getPublicationById,
    updatePublication,
} from '../controllers/PublicationController';
import { uploadMiddleware } from '../middleware/uploadMiddleware';
import verifyToken from '../middleware/verifyTokenMiddleware';

export const publicationRoutes = () => {
    const router = express.Router();
    router.get('/', getPublication);
    router.get('/:id', getPublicationById);
    router.post('/create', verifyToken,  uploadMiddleware, createPublication);
    router.put('/update/:id', verifyToken, uploadMiddleware, updatePublication);
    router.delete('/delete/:id', verifyToken, deletePublication);

    return router;
};
