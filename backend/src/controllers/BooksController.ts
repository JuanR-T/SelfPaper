import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';
import Books from '../models/Books';
import Images from '../models/Images';
import Publisher from '../models/Publisher';
import Theme from '../models/Theme';
import { FileUploadData } from '../types/utils';
import baseToBufferImage from '../utils/baseToBufferImage';
import formatDate from '../utils/formatDate';
import formatImageData from '../utils/formatImageData';
import matchesExistingImage from '../utils/matchesExistingImage';
import { checkPublisherService } from '../utils/publisherHasSameService';

export const getBooks = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const book = await Books.find({});
        if (!book) throw new Error("Couldn't find any books");

        const books = await Promise.all(
            book.map(async (book) => {
                return {
                    ...book.toObject(),
                    bookPublicationDate: formatDate(book.bookPublicationDate),
                    theme: await Theme.findById(book.theme),
                    bookPublisher: await Publisher.findById(book.bookPublisher?._id),
                    author: await Author.findById(book.bookAuthor),
                    thumbnail: formatImageData(await Images.findById(book.thumbnail)),
                    bookImage: formatImageData(await Images.findById(book.bookImage))
                };
            }),
        );
        return res.status(200).json({ data: { found: true, books } });
    } catch (err) {
        next(err);
    }
};

export const createBook = async (
    req: any,
    res: any,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const hasSameService = await checkPublisherService(req);
        if (!hasSameService) {
            throw new Error(
                'Publisher service from request does not match existing publisher service',
            );
        }
        const convertedImages: FileUploadData = await baseToBufferImage(req.files);
        if (!convertedImages) {
            throw new Error(
                'Could not convert thumbnail / postImage to buffer',
            );
        }
        const { title, description, link, theme, bookPublicationDate } = req.body;

        const existingImages = await matchesExistingImage(convertedImages);
        const newBook = await Books.create({
            title,
            description,
            link,
            bookPublicationDate,
            bookAuthor: JSON.parse(req.body.bookAuthor),
            bookPublisher: JSON.parse(req.body.bookPublisher),
            bookPublisherService: JSON.parse(req.body.bookPublisher).service,
            bookImage: existingImages[1],
            thumbnail: existingImages[0],
            theme,
        });
        for (const images of existingImages) {
            if (!images.publications.includes(newBook._id)) {
                images.publications.push(newBook._id);
                await images.save();
            }
        }
        if (!newBook)
            throw new Error('Book could not be created. Wrong params.');
        return res.status(200).json({ data: { created: true } });
    } catch (err) {
        next(err);
    }
};

export const updateBook = async (
    req: any,
    res: any,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string' || !mongoose.Types.ObjectId.isValid(id)) {
            throw new Error('Invalid publication ID format. Please provide a valid ID.');
        }

        const convertedImages: FileUploadData = await baseToBufferImage(req.files);
        if (!convertedImages) {
            throw new Error(
                'Could not convert thumbnail / postImage to buffer',
            );
        }
        const existingImages = await matchesExistingImage(convertedImages)

        const updateData: any = {
            ...req.body,
            bookPublisher: JSON.parse(req.body.publisher),
            bookPublisherService: JSON.parse(req.body.publisher).service,
            theme: JSON.parse(req.body.theme),
            bookAuthor: JSON.parse(req.body.author),
            thumbnail: existingImages[0],
            postImage: existingImages[1],
        };
        const updatedBook = await Books.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedBook)
            throw new Error('Could not update book. Wrong params;');

        return res.status(200).json({ data: { updated: true, updatedBook } });
    } catch (err) {
        next(err);
    }
};

export const deleteBook = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not delete book, wrong id param.');
        const deletedBook = await Books.findByIdAndDelete(id);
        if (!deletedBook) throw new Error('Could not delete book.');

        return res.status(200).json({ data: { deleted: true, deletedBook } });
    } catch (err) {
        next(err);
    }
};
