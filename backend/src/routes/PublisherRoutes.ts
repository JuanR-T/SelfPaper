import express from 'express';
import {
    createPublisher,
    deletePublisher,
    getPublisher,
    getPublisherById,
    updatePublisher,
} from '../controllers/PublisherController';
import verifyToken from '../middleware/verifyTokenMiddleware';

export const publisherRoutes = () => {
    const router = express.Router();
    router.get('/', getPublisher);
    router.get('/:id', getPublisherById);
    router.post('/create', verifyToken, createPublisher);
    router.put('/update/:id', verifyToken, updatePublisher);
    router.delete('/delete/:id', verifyToken, deletePublisher);

    return router;
};
