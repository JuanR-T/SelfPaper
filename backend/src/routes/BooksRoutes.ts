import express from 'express';
import {
    getBooks,
    createBook,
    updateBook,
    deleteBook,
} from '../controllers/BooksController';

export const booksRoutes = () => {
    const router = express.Router();
    router.get('/', getBooks);
    router.post('/create', createBook);
    router.put('/update/:id', updateBook);
    router.delete('/delete/:id', deleteBook);

    return router;
};
