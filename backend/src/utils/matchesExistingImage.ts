import Images from "../models/Images";
import { FileUploadData, UploadedFile } from "../types/utils";

const matchesExistingImage = async (convertedImages: FileUploadData) => {
    try {
        const results = await Promise.all(
            Object.entries(convertedImages).map(async ([field, images]) => {
                if (!images || images.length === 0) return [];

                const existingImages = await Promise.all(
                    images.map(async (image: UploadedFile) => {
                        const existingImage = await Images.findOne({ image: image.buffer });

                        if (existingImage) {
                            return existingImage;
                        } else {
                            const newImage = new Images({
                                type: image.fieldname,
                                format: image.mimetype, 
                                image: image.buffer,
                                publications: [],
                            });
                            await newImage.save();
                            return newImage;
                        }
                    })
                );

                return existingImages;
            })
        );

        return results.flat();
    } catch (error) {
        console.error("Error while checking for matching images:", error);
        throw new Error("Checking for matching images failed");
    }
};

export default matchesExistingImage;