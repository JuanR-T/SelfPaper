import { Request, Response } from 'express';
import Publication from '../models/Publication';

export const getPublication = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const publication = await Publication.find({});
        return res.status(200).json(publication);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const getPublicationById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const publicationById = await Publication.findById(id);
        return res.status(200).json(publicationById);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const createPublication = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const newPublication = await Publication.create(req.body);
        return res.status(200).json(newPublication);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const updatePublication = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const updatedPublication = await Publication.findByIdAndUpdate(
            id,
            req.body,
        );

        return res.status(200).json(updatedPublication);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

export const deletePublication = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        const deletedPublication = await Publication.findByIdAndDelete(id);

        return res.status(200).json(deletedPublication);
    } catch (error: any) {
        return res.status(500).json({ message: error.message });
    }
};

//TODO make an error / unfound handler
