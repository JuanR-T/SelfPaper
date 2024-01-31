import { Request, Response } from 'express';
import Theme from '../models/Theme';
import { handleControllerErrors } from '../utils/handleControllerErrors';

export const getThemes = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const theme = await Theme.find({});
        if (!theme) throw new Error('Could not find any Themes');

        return res.status(200).json({ data: { found: true, theme } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not find any themes.');
    }
};

export const getThemeById = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Could not get theme by id. Wrong id.');

        const themeById = await Theme.findById(id);
        if (!themeById) throw new Error('Could not find this theme');

        return res.status(200).json({ data: { found: true, themeById } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not find this theme');
    }
};

export const createTheme = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const newTheme = await Theme.create(req.body);
        if (!newTheme) throw new Error('Could not create theme. Wrong params.');

        return res.status(200).json({ data: { created: true, newTheme } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not create theme.');
    }
};

export const deleteTheme = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Could not delete theme. Wrong id');

        const deletedTheme = await Theme.findByIdAndDelete(id);
        if (!deletedTheme) throw new Error('Could not delete theme');

        return res.status(200).json({ data: { deleted: true, deletedTheme } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not delete theme.');
    }
};

export const updateTheme = async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id || typeof id !== 'string')
            throw new Error('Could not update theme. Wrong id');

        const updatedTheme = await Theme.findByIdAndUpdate(id, req.body);
        if (!updatedTheme) throw new Error('Could not update theme');

        return res.status(200).json({ data: { updated: true, updatedTheme } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not update theme.');
    }
};
