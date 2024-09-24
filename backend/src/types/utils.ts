export type UploadedFile = {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    buffer: Buffer;
    size: number;
};

export type FileUploadData = {
    thumbnail?: UploadedFile[];
    postImage?: UploadedFile[];
};