import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import Theme from '../models/Theme';

export const getThemes = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const theme = await Theme.find({});
        if (!theme) throw new Error('Could not find any Themes');

        return res.status(200).json({ data: { found: true, theme } });
    } catch (err) {
        next(err);
    }
};

export const getThemeById = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not get theme by id. Wrong id.');

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(
                'Invalid theme ID format. Please provide a valid ID.',
            );
        }

        const themeById = await Theme.findById(id);
        if (!themeById) throw new Error('Could not find this theme');

        return res.status(200).json({ data: { found: true, themeById } });
    } catch (err) {
        next(err);
    }
};

export const createTheme = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const newTheme = await Theme.create(req.body);
        if (!newTheme) throw new Error('Could not create theme. Wrong params.');

        return res.status(200).json({ data: { created: true, newTheme } });
    } catch (err) {
        next(err);
    }
};

export const deleteTheme = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not delete theme. Wrong id');

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(
                'Invalid theme ID format. Please provide a valid ID.',
            );
        }

        const deletedTheme = await Theme.findByIdAndDelete(id);
        if (!deletedTheme) throw new Error('Could not delete theme');

        return res.status(200).json({ data: { deleted: true, deletedTheme } });
    } catch (err) {
        next(err);
    }
};

export const updateTheme = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<Response | undefined> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not update theme. Wrong id');

        if (!mongoose.Types.ObjectId.isValid(id)) {
            throw new Error(
                'Invalid theme ID format. Please provide a valid ID.',
            );
        }

        const updatedTheme = await Theme.findByIdAndUpdate(id, req.body);
        if (!updatedTheme) throw new Error('Could not update theme');

        return res.status(200).json({ data: { updated: true, updatedTheme } });
    } catch (err) {
        next(err);
    }
};
