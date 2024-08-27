import express from 'express';
import {
    deleteImage,
    getImageById,
    getImages,
    updateImage,
    uploadImage,
} from '../controllers/ImagesController';
import verifyToken from '../middleware/verifyTokenMiddleware';

export const imagesRoutes = () => {
    const router = express.Router();
    router.get('/', getImages);
    router.get('/:id', getImageById);
    router.post('/upload', verifyToken, uploadImage);
    router.delete('/delete/:id', verifyToken, deleteImage);
    router.put('/update/:id', verifyToken, updateImage);

    return router;
};
