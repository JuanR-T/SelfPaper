import Images from "../models/Images";

const baseToBufferImage = async (base64Data: string, imageType: string) => {
    try {
        const imageBuffer = Buffer.from(base64Data, 'base64');
        console.log("imageBuffer", imageBuffer)
        const newImage = new Images({
            type: imageType,
            image: imageBuffer,
        });
        console.log("newImage", newImage)
        await newImage.save();
        return newImage;
    } catch (error) {
        console.error('Error saving image:', error);
        throw new Error('Image save failed');
    }
};

export default baseToBufferImage;