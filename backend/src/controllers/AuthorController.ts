import { Request, Response } from 'express';
import Author from '../models/Author';
import { handleControllerErrors } from '../utils/handleControllerErrors';
import bcrypt, { hash, genSalt, compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';

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
        const existingAuthor = await Author.findOne({ email: req.body.email });
        if (existingAuthor) {
            throw new Error(
                'Email is already in use. Please use a different email.',
            );
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        const newAuthor = await Author.create(req.body);
        if (!newAuthor)
            throw new Error('Could not create author. Wrong params.');

        const token = jwt.sign(
            {
                author: {
                    id: newAuthor._id,
                    firstName: newAuthor.firstName,
                    lastName: newAuthor.lastName,
                    email: newAuthor.email,
                    phoneNumber: newAuthor.phoneNumber,
                },
            },
            `${process.env.JWT_SECRET_KEY}`,
            { expiresIn: '1h' },
        );

        return res
            .status(200)
            .json({ data: { created: true, newAuthor, token } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not create Author.');
    }
};

//TODO make a middleware to check if there's doublons

export const loginAuthor = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const existingAuthor = await Author.findOne({ email });

        if (!existingAuthor) {
            throw new Error('Author not found. Please check your credentials.');
        }

        const isPasswordValid = await bcrypt.compare(
            password,
            existingAuthor.password,
        );

        if (!isPasswordValid) {
            throw new Error('Invalid password. Please check your credentials.');
        }

        // If the password is valid, you can generate a token for authentication
        const token = jwt.sign(
            {
                author: {
                    id: existingAuthor._id,
                    firstName: existingAuthor.firstName,
                    lastName: existingAuthor.lastName,
                    email: existingAuthor.email,
                    phoneNumber: existingAuthor.phoneNumber,
                },
            },
            `${process.env.JWT_SECRET_KEY}`,
            { expiresIn: '1h' },
        );
        console.log('token', token);
        return res.status(200).json({ data: { authenticated: true, token } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not log in Author.');
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
