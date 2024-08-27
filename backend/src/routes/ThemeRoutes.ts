import express from 'express';
import {
    createTheme,
    deleteTheme,
    getThemeById,
    getThemes,
    updateTheme,
} from '../controllers/ThemeController';
import verifyToken from '../middleware/verifyTokenMiddleware';

export const themeRoutes = () => {
    const router = express.Router();
    router.get('/', getThemes);
    router.get('/:id', getThemeById);
    router.post('/create', verifyToken, createTheme);
    router.put('/update/:id', verifyToken, updateTheme);
    router.delete('/delete/:id', verifyToken, deleteTheme);

    return router;
};
