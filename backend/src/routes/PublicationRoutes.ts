import express from 'express';

import multer from 'multer';
import {
    createPublication,
    deletePublication,
    getPublication,
    getPublicationById,
    updatePublication,
} from '../controllers/PublicationController';
import verifyToken from '../middleware/verifyTokenMiddleware';

const upload = multer({ storage: multer.memoryStorage() });
export const publicationRoutes = () => {
    const router = express.Router();
    router.get('/', getPublication);
    router.get('/:id', getPublicationById);
    router.post('/create', verifyToken,  upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'postImage', maxCount: 1 },
  ]), createPublication);
    router.put('/update/:id', verifyToken, updatePublication);
    router.delete('/delete/:id', verifyToken, deletePublication);

    return router;
};
