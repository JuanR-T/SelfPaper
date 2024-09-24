import { FileUploadData } from "../types/utils";

/** Helper function to convert file from base64 to buffer */
const baseToBufferImage = async (files: FileUploadData) => {
    try {
        const imageFields = ['thumbnail', 'postImage'] as const;

        const convertedImages: Partial<FileUploadData> = {};

        await Promise.all(
            imageFields.map((field) => {
                const images = files[field];
                if (!images || images.length === 0) return;

                convertedImages[field] = images.map((imageFile) => ({
                    ...imageFile,
                    buffer: Buffer.from(imageFile.buffer.toString('base64'), 'base64'),
                }));
            })
        );

        return convertedImages;
    } catch (error) {
        console.error("Error converting images:", error);
        throw new Error("Image converting failed");
    }
};

export default baseToBufferImage;