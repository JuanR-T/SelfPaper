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
    router.post('/create', verifyToken, createPublication);
    router.put('/update/:id', verifyToken, updatePublication);
    router.delete('/delete/:id', verifyToken, deletePublication);

    return router;
};
