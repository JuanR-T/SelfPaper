import express from 'express';
import {
    createBook,
    deleteBook,
    getBooks,
    updateBook,
} from '../controllers/BooksController';
import { uploadMiddleware } from '../middleware/uploadMiddleware';
import verifyToken from '../middleware/verifyTokenMiddleware';

export const booksRoutes = () => {
    const router = express.Router();
    router.get('/', getBooks);
    router.post('/create', verifyToken, uploadMiddleware, createBook);
    router.put('/update/:id', verifyToken, uploadMiddleware, updateBook);
    router.delete('/delete/:id', verifyToken, deleteBook);

    return router;
};
