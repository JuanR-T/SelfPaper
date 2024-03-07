import { Request, Response } from 'express';
import Images from "../models/Images";
import { handleControllerErrors } from '../utils/handleControllerErrors';
import multer from "multer";

export const getImages =  async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const images = await Images.find({});
        console.log("images", images)
        if (!images) throw new Error('Could not find any images');
        return res.status(200).json({ data: { found: true, images } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not find any images.');
    }
};

export const getImageById =  async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Could not get image by id. Wrong id.');

        const imageById = await Images.findById(id);
        console.log("imageById", imageById);

        if (!imageById) throw new Error('Could not find that image');
        return res.status(200).json({ data: { found: true, imageById } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not find that image.');
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Uploads will be stored in the 'uploads' directory
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-'); // Use a unique filename
    }
});

const upload = multer({ storage: storage });

export const uploadImage =  async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        upload.single('image')
        const imageUrl = req?.body?.image;
        console.log("imageUrl", imageUrl);
        if (!imageUrl) throw new Error('Image upload failed.');

        const savingImage = new Images({
                title: req.body.title,
                image: imageUrl,
        });
        console.log("saving",savingImage);
        await savingImage.save();
        if (!savingImage) throw new Error('Image saving to database failed.');

        return res.status(200).json({data:{ saved: true, imageUrl: imageUrl }});
    } catch (err) {
        return handleControllerErrors(err, res, 'Failed to upload image.');
    }
};

export const deleteImage =  async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Could not delete image. Wrong id.');

        const deletedImage = await Images.findByIdAndDelete(id);
        if (!deletedImage) throw new Error('Could not find or delete that image');
        return res.status(200).json({ data: { deleted: true, deletedImage } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not delete that image.');
    }
};

export const updateImage =  async (
    req: Request,
    res: Response,
): Promise<Response> => {
    try {
        const { id } = req.params;
        if (!id) throw new Error('Could not update image. Wrong id.');

        const updatedImage = await Images.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedImage) throw new Error('Could not find or update that image');
        return res.status(200).json({ data: { updated: true, updatedImage } });
    } catch (err) {
        return handleControllerErrors(err, res, 'Could not update that image.');
    }
};