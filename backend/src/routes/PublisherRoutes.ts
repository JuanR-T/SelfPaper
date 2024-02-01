import express from 'express';
import {
    getPublisher,
    getPublisherById,
    createPublisher,
    deletePublisher,
    updatePublisher,
} from '../controllers/PublisherController';

export const publisherRoutes = () => {
    const router = express.Router();
    router.get('/', getPublisher);
    router.get('/:id', getPublisherById);
    router.post('/create', createPublisher);
    router.put('/update/:id', updatePublisher);
    router.delete('/delete/:id', deletePublisher);

    return router;
};
