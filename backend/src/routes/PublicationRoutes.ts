import express from 'express';
import {
    getPublication,
    getPublicationById,
    createPublication,
    updatePublication,
    deletePublication,
} from '../controllers/PublicationController';

export const publicationRoutes = () => {
    const router = express.Router();
    router.get('/', getPublication);
    router.get('/:id', getPublicationById);
    router.post('/create', createPublication);
    router.post('/update', updatePublication);
    router.post('/delete', deletePublication);

    return router;
};
