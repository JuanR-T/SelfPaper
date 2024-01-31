import { Request, Response } from 'express';
import Author from '../models/Author';
import { handleControllerErrors } from '../utils/handleControllerErrors';

export const getAuthors = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const author = await Author.find({});
        if (!author) throw new Error('Could not find any authors');

        return res.status(200).json({ data: { found: true, author } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not find any authors.');
    }
};

export const getAuthorById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Could not get author by id. Wrong id.');

        const authorById = await Author.findById(id);
        if (!authorById) throw new Error('Could not find this author');

        return res.status(200).json({ data: { found: true, authorById } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not find this author');
    }
};

export const createAuthor = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const newAuthor = await Author.create(req.body);
        if (!newAuthor)
            throw new Error('Could not create author. Wrong params.');

        return res.status(200).json({ data: { created: true, newAuthor } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not create Author.');
    }
};

export const deleteAuthor = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Could not delete Author. Wrong id');

        const deletedAuthor = await Author.findByIdAndDelete(id);
        if (!deletedAuthor) throw new Error('Could not delete Author');

        return res.status(200).json({ data: { deleted: true, deletedAuthor } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not delete Author.');
    }
};

export const updateAuthor = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not update Author. Wrong id');

        const updatedAuthor = await Author.findByIdAndUpdate(id, req.body);
        if (!updatedAuthor) throw new Error('Could not update Author');

        return res.status(200).json({ data: { updated: true, updatedAuthor } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not update Author.');
    }
};
