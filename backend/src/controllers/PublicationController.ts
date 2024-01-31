import { Request, Response } from 'express';
import Publication from '../models/Publication';
import { handleControllerErrors } from '../utils/handleControllerErrors';

export const getPublication = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const publication = await Publication.find({});
        if (!publication) throw new Error("Couldn't find any publications");

        return res.status(200).json({data: {found: true, publication}});
    } catch (err) {
        return handleControllerErrors(err, res, 'Publications not found');
    }
};

export const getPublicationById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const publicationById = await Publication.findById(id);

        if (!id)
            throw new Error('Publication id not found. Wrong request params');
        if (!publicationById)
            throw new Error('Could not find this publication');

        return res.status(200).json({data: {found: true, publicationById}});
    } catch (err) {
        return handleControllerErrors(
            err,
            res,
            'Could not find this publication',
        );
    }
};

export const createPublication = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const newPublication = await Publication.create(req.body);

        if (!newPublication)
            throw new Error('Publication could not be created. Wrong params');

        return res.status(200).json({data: {created: true, newPublication}});
    } catch (err) {
        return handleControllerErrors(
            err,
            res,
            'Publication could not be created',
        );
    }
};

export const updatePublication = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id)
            throw new Error(
                'Could not find publication id for update. Wrong id',
            );

        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            req.body,
        );
        if (!updatedPublication)
            throw new Error('Could not update publication. Wrong params;');

        return res.status(200).json({data: {updated: true, updatedPublication}});
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not update publication');
    }
};

export const deletePublication = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) throw new Error("Could not delete publication. Wrong id");

        const deletedPublication = await Publication.findByIdAndDelete(id);
        if (!deletedPublication) throw new Error("Could not delete publication.");

        return res.status(200).json({data: {deleted: true, deletedPublication}});
    } catch (err) {
        return handleControllerErrors(err, res, "Could not delete publication.");
    }
};