import { handleControllerErrors } from '../utils/handleControllerErrors';
import { Request, Response, response } from 'express';
import Books from '../models/Books';
import Author from '../models/Author';
import Publisher from '../models/Publisher';
import Theme from '../models/Theme';

export const getBooks = async (
    req: Request,
    res: Response
) : Promise<Response> => {
    try {
        
        const book = await Books.find({});
        if (!book) throw new Error("Couldn't find any books");
        
        const books = await Promise.all(book.map(async(book) => {
            const author = await Author.findById(book.bookAuthor);
            const theme = await Theme.findById(book.theme);
            const bookPublisher = [await Publisher.findById(book.bookPublisher?._id)];
            const formattedBookPublicationDate = new Date(book.bookPublicationDate).toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
            });
            return { ...book.toObject(), bookPublicationDate: formattedBookPublicationDate, theme, bookPublisher, author };
        }))
        return res.status(200).json({ data: { found: true, books } });

    } catch (err) {
        return handleControllerErrors(err, res, 'Books not found');
    }
}

export const createBook = async (
    req: Request,
    res: Response
) : Promise<Response> => {
    try {
        const newBook = await Books.create(req.body);
        if (!newBook) throw new Error("Book could not be created. Wrong params.");
        return res.status(200).json({data: {created: true,  }});
    } catch (err) {
        return handleControllerErrors(err, res, "Couldn't create a book")
    }
}

export const updateBook = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error(
                'Could not find publication id for update. Wrong id',
            );
        console.log(req.params,"SEPARATE", req.body)
        const updatedBook = await Books.findByIdAndUpdate(
            id,
            req.body,
        );
        if (!updatedBook)
            throw new Error('Could not update book. Wrong params;');

        return res
            .status(200)
            .json({ data: { updated: true, updatedBook } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not update book');
    }
};

export const deleteBook = async (
    req: Request,
    res: Response
) : Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string') throw new Error("Could not delete book, wrong id param.");
        const deletedBook = await Books.findByIdAndDelete(id);
        if (!deletedBook)
            throw new Error('Could not delete book.');

        return res.status(200).json({data: {deleted: true, deletedBook}});
    } catch (err) {
        return handleControllerErrors(err, res, "Could not delete the book")
    }
}
