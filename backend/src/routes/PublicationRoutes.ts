import express from 'express';
import {
    createPublication,
    deletePublication,
    getPublication,
    getPublicationById,
    updatePublication,
} from '../controllers/PublicationController';
import verifyToken from '../middleware/verifyTokenMiddleware';

export const publicationRoutes = () => {
    const router = express.Router();
    router.get('/', getPublication);
    router.get('/:id', getPublicationById);
    router.post('/create', verifyToken(true), createPublication);
    router.put('/update/:id', verifyToken(true), updatePublication);
    router.delete('/delete/:id', verifyToken(true), deletePublication);

    return router;
};
