import express from 'express';
import {
    createAuthor,
    deleteAuthor,
    getAuthorById,
    getAuthors,
    loginAuthor,
    updateAuthor,
} from '../controllers/AuthorController';
import verifyToken from '../middleware/verifyTokenMiddleware';

export const authorRoutes = () => {
    const router = express.Router();
    router.get('/', getAuthors);
    router.get('/:id', getAuthorById);
    router.post('/create', verifyToken, createAuthor);
    router.delete('/delete/:id', verifyToken, deleteAuthor);
    router.put('/update/:id', verifyToken, updateAuthor);
    router.post('/login', loginAuthor);

    return router;
};
