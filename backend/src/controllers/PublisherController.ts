import { Request, Response } from 'express';
import Publisher from '../models/Publisher';
import { handleControllerErrors } from '../utils/handleControllerErrors';
import mongoose from 'mongoose';

export const getPublisher = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const publisher = await Publisher.find({});
        if (!publisher) throw new Error('Could not find any publishers');

        return res.status(200).json({ data: { found: true, publisher } });
    } catch (err) {
        return handleControllerErrors(
            err,
            res,
            'Could not find any publishers',
        );
    }
};

export const getPublisherById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
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
        return handleControllerErrors(
            err,
            res,
            'Could not find this publisher',
        );
    }
};
//TODO check if the publisher already exists.
export const createPublisher = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    console.log('request ez', req.body);
    try {
        const newPublisher = await Publisher.create(req.body);
        if (!newPublisher)
            throw new Error('Could not create publisher. Wrong params.');

        return res.status(200).json({ data: { created: true, newPublisher } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not create publisher.');
    }
};

export const deletePublisher = async (
    req: Request,
    res: Response,
): Promise<Response> => {
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
        return handleControllerErrors(err, res, 'Could not delete publisher.');
    }
};

export const updatePublisher = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not update publisher. Wrong id');

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(
                'Invalid theme ID format. Please provide a valid ID.',
            );
        }
        console.log("body", req.body);
        const updatedPublisher = await Publisher.findByIdAndUpdate(
            id,
            req.body,
            { new: true, runValidators: true }
        );
        console.log("updatedPublisher", updatedPublisher)
        if (!updatedPublisher) throw new Error('Could not update publisher');

        return res
            .status(200)
            .json({ data: { updated: true, updatedPublisher } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not update publisher.');
    }
};
