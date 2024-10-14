const formatImageData = (file: any) => {
    if (file && file.image) {
        const { _id, type, format, image } = file;
        
        return {
            _id,
            type,
            format,
            image: `${file.image.toString('base64')}`
        };
    }
    return null;
};

export default formatImageData;