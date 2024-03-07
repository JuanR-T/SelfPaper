import express from 'express';
import {
    getImages,
    getImageById,
    uploadImage,
    deleteImage,
    updateImage
} from '../controllers/ImagesController';

export const imagesRoutes = () => {
    const router = express.Router();
    router.get('/', getImages);
    router.get('/:id', getImageById);
    router.post('/upload', uploadImage);
    router.delete('/delete/:id', deleteImage);
    router.put('/update/:id', updateImage);

    return router;
};
