import { Request, Response } from 'express';
import Publisher from '../models/Publisher';
import { handleControllerErrors } from '../utils/handleControllerErrors';

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
        if (!id) throw new Error('Could not get publisher by id. Wrong id.');

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

export const createPublisher = async (
    req: Request,
    res: Response,
): Promise<Response> => {
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
        if (!id) throw new Error('Could not delete publisher. Wrong id');

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

        const updatedPublisher = await Publisher.findByIdAndUpdate(
            id,
            req.body,
        );
        if (!updatedPublisher) throw new Error('Could not update publisher');

        return res
            .status(200)
            .json({ data: { updated: true, updatedPublisher } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not update publisher.');
    }
};
