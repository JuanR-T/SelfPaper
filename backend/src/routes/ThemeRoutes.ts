import express from 'express';
import {
    getThemes,
    getThemeById,
    createTheme,
    updateTheme,
    deleteTheme
} from '../controllers/ThemeController';

export const themeRoutes = () => {
    const router = express.Router();
    router.get('/', getThemes);
    router.get('/:id', getThemeById);
    router.post('/create', createTheme);
    router.put('/update/:id', updateTheme);
    router.delete('/delete/:id', deleteTheme);

    return router;
};
