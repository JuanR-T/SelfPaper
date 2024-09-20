import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';
import Publication from '../models/Publication';
import Publisher from '../models/Publisher';
import Theme from '../models/Theme';
import baseToBufferImage from '../utils/baseToBufferImage';
import { checkPublisherService } from '../utils/publisherHasSameService';

export const getPublication = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    //TODO return the matching publisher services from the publication, it returns everything now
    try {
        const publication = await Publication.find({});
        if (!publication) throw new Error("Couldn't find any publications");

        const publications = await Promise.all(
            publication.map(async (publication) => {
                const author = await Author.findById(publication.author);
                const theme = await Theme.findById(publication.theme);
                const publisher = await Publisher.findById(
                    publication.publisher?._id,
                );
                if (publisher) {
                    publisher.service = publication.publisher?.service;
                }
                //TODO make it generic for other models
                const formattedPublicationDate = new Date(
                    publication.publicationDate,
                ).toLocaleDateString('fr-FR', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                });
                return {
                    ...publication.toObject(),
                    publicationDate: formattedPublicationDate,
                    theme,
                    publisher,
                    author,
                };
            }),
        );
        return res.status(200).json({ data: { found: true, publications } });
    } catch (err) {
        next(err);
    }
};

export const getPublicationById = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Publication id not found. Wrong request params');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(
                'Invalid theme ID format. Please provide a valid ID.',
            );
        }

        const publicationById = await Publication.findById(id);
        if (!publicationById)
            throw new Error('Could not find this publication');

        return res.status(200).json({ data: { found: true, publicationById } });
    } catch (err) {
        next(err);
    }
};

export const createPublication = async (
    req: any,
    res: any,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        console.log('Received body', req.body);
        console.log('Received files', req.files);

        const hasSameService = await checkPublisherService(req);
        if (!hasSameService) {
            throw new Error(
                'Publisher service from request does not match existing publisher service',
            );
        }

        // Access form fields from req.body

        // Access the files from req.files
        const thumbnail = req.files.thumbnail ? req.files.thumbnail[0] : null;
        const postImage = req.files.postImage ? req.files.postImage[0] : null;
        const publisher = req.body.publisher ? JSON.parse(req.body.publisher) : null;
        console.log("publishergourou", publisher)
        const author = req.body.author ? JSON.parse(req.body.author) : null;
        const publicationThumbnail = thumbnail
            ? await baseToBufferImage(thumbnail.buffer, 'thumbnail')
            : null;

        const publicationPostImage = postImage
            ? await baseToBufferImage(postImage.buffer, 'postImage')
            : null;

        console.log("publicationThumbnail", publicationThumbnail);
        console.log("publicationPostImage", publicationPostImage);

        
        const { title, description, link, type, theme, excerpt, publicationDate } = req.body;

        const newPublication = await Publication.create({
            title,
            description,
            link,
            type,
            theme,
            excerpt,
            publicationDate,
            publisher,
            author,
            thumbnail: publicationThumbnail ? [publicationThumbnail._id] : [],
            postImage: publicationPostImage ? [publicationPostImage._id] : [],
        });

        if (publicationThumbnail && newPublication) {
            publicationThumbnail.publications.push(newPublication._id);
            await publicationThumbnail.save();
        }

        if (publicationPostImage && newPublication) {
            publicationPostImage.publications.push(newPublication._id);
            await publicationPostImage.save();
        }

        console.log('newPublication', newPublication);
        if (!newPublication) throw new Error('Publication could not be created. Wrong params');

        return res.status(200).json({ data: { created: true, newPublication } });
    } catch (err) {
        next(err);
    }
};

export const updatePublication = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error(
                'Could not find publication id for update. Wrong id',
            );
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(
                'Invalid theme ID format. Please provide a valid ID.',
            );
        }

        const hasSameService = await checkPublisherService(req);
        if (!hasSameService) {
            throw new Error(
                'Publisher service from request does not match existing publisher service',
            );
        }

        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            req.body,
        );
        if (!updatedPublication)
            throw new Error('Could not update publication. Wrong params;');

        return res
            .status(200)
            .json({ data: { updated: true, updatedPublication } });
    } catch (err) {
        next(err);
    }
};

export const deletePublication = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not delete publication. Wrong id');
        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(
                'Invalid theme ID format. Please provide a valid ID.',
            );
        }

        const deletedPublication = await Publication.findByIdAndDelete(id);
        if (!deletedPublication)
            throw new Error('Could not delete publication.');

        return res
            .status(200)
            .json({ data: { deleted: true, deletedPublication } });
    } catch (err) {
        next(err);
    }
};
