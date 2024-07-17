import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Publisher from '../models/Publisher';

export const getPublisher = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const publisher = await Publisher.find({});

        if (!publisher) throw new Error('Could not find any publishers');

        return res.status(200).json({ data: { found: true, publisher } });
    } catch (err) {
        next(err);
    }
};

export const getPublisherById = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not get publisher by id. Wrong id.');

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(
                'Invalid theme ID format. Please provide a valid ID.',
            );
        }

        const publisherById = await Publisher.findById(id);
        if (!publisherById) throw new Error('Could not find this publisher');

        return res.status(200).json({ data: { found: true, publisherById } });
    } catch (err) {
        next(err);
    }
};
//TODO check if the publisher already exists.
export const createPublisher = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const newPublisher = await Publisher.create(req.body);
        if (!newPublisher)
            throw new Error('Could not create publisher. Wrong params.');

        return res.status(200).json({ data: { created: true, newPublisher } });
    } catch (err) {
        next(err);
    }
};

export const deletePublisher = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not delete publisher. Wrong id');

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(
                'Invalid theme ID format. Please provide a valid ID.',
            );
        }

        const deletedPublisher = await Publisher.findByIdAndDelete(id);
        if (!deletedPublisher) throw new Error('Could not delete publisher');

        return res
            .status(200)
            .json({ data: { deleted: true, deletedPublisher } });
    } catch (err) {
        next(err);
    }
};

export const updatePublisher = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not update publisher. Wrong id');

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(
                'Invalid theme ID format. Please provide a valid ID.',
            );
        }
        const updatedPublisher = await Publisher.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true },
        );
        if (!updatedPublisher) throw new Error('Could not update publisher');

        return res
            .status(200)
            .json({ data: { updated: true, updatedPublisher } });
    } catch (err) {
        next(err);
    }
};
