import express from 'express';
import {
    getAuthors,
    getAuthorById,
    createAuthor,
    deleteAuthor,
    updateAuthor,
    loginAuthor
} from '../controllers/AuthorController';

export const authorRoutes = () => {
    const router = express.Router();
    router.get('/', getAuthors);
    router.get('/:id', getAuthorById);
    router.post('/create', createAuthor);
    router.delete('/delete/:id', deleteAuthor);
    router.put('/update/:id', updateAuthor);
    router.post('/login', loginAuthor);

    return router;
};
