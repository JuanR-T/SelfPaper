import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author';
import Images from '../models/Images';
import Publication from '../models/Publication';
import Publisher from '../models/Publisher';
import Theme from '../models/Theme';
import { FileUploadData } from '../types/utils';
import baseToBufferImage from '../utils/baseToBufferImage';
import formatDate from '../utils/formatDate';
import formatImageData from '../utils/formatImageData';
import matchesExistingImage from '../utils/matchesExistingImage';
import { checkPublisherService } from '../utils/publisherHasSameService';

export const getPublication = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const publication = await Publication.find({});
        if (!publication) throw new Error("Couldn't find any publications");

        const publications = await Promise.all(
            publication.map(async (publication) => {
                //TODO Consider doing 3rd folder for mutual types/data handling between back and front

                return {
                    ...publication.toObject(),
                    publicationDate: formatDate(publication.publicationDate),
                    theme: await Theme.findById(publication.theme),
                    publisher: await Publisher.findById(publication.publisher?._id),
                    author: await Author.findById(publication.author),
                    thumbnail: formatImageData(await Images.findById(publication.thumbnail)),
                    postImage: formatImageData(await Images.findById(publication.postImage))
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
        
        const { title, description, link, type, theme, excerpt, publicationDate } = req.body;

        const existingImages = await matchesExistingImage(convertedImages);
        const newPublication = await Publication.create({
            title,
            description,
            link,
            type,
            theme,
            excerpt,
            publicationDate,
            publisher: JSON.parse(req.body.publisher),
            publisherService: JSON.parse(req.body.publisher).service,
            author: JSON.parse(req.body.author),
            thumbnail: existingImages[0],
            postImage: existingImages[1],
        });

        for (const images of existingImages) {
            if (!images.publications.includes(newPublication._id)) {
                images.publications.push(newPublication._id);
                await images.save();
            }
        }

        if (!newPublication) throw new Error('Publication could not be created. Wrong params');

        return res.status(200).json({ data: { created: true, newPublication } });
    } catch (err) {
        next(err);
    }
};


export const updatePublication = async (
    req: any,
    res: any,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params as { id: string };
        
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
            publisher: JSON.parse(req.body.publisher),
            publisherService: JSON.parse(req.body.publisher).service,
            theme: JSON.parse(req.body.theme),
            author: JSON.parse(req.body.author),
            thumbnail: existingImages[0],
            postImage: existingImages[1],
        };
        
        const hasSameService = await checkPublisherService(req);
        if (!hasSameService) {
            throw new Error('Publisher service from request does not match existing publisher service');
        }

        const updatedPublication = await Publication.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedPublication) {
            throw new Error('Could not update publication. Wrong params;');
        }

        for (const image of existingImages) {
            image.publications = image.publications.filter(pubId => !pubId.equals(updatedPublication._id));
            image.publications.push(updatedPublication._id);
            await image.save();
        }

        return res.status(200).json({ data: { updated: true, updatedPublication } });
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
