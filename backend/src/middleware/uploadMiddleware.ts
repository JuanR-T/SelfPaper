import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

export const uploadMiddleware = upload.fields([
    { name: 'thumbnail', maxCount: 1 },
    { name: 'postImage', maxCount: 1 },
    { name: 'bookImage', maxCount: 1 },
]);