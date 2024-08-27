import express from 'express';
import {
    createBook,
    deleteBook,
    getBooks,
    updateBook,
} from '../controllers/BooksController';
import verifyToken from '../middleware/verifyTokenMiddleware';

export const booksRoutes = () => {
    const router = express.Router();
    router.get('/', getBooks);
    router.post('/create', verifyToken, createBook);
    router.put('/update/:id', verifyToken, updateBook);
    router.delete('/delete/:id', verifyToken, deleteBook);

    return router;
};
