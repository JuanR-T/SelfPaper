import { Schema, SchemaTypes, model } from 'mongoose';

const publicationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
    thumbnail: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Images',
            required: false,
        },
    ],
    postImage: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Images',
            required: false,
        },
    ],
    type: [{ type: String, required: true }], //DESC article, podcast...
    theme: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Theme',
        },
    ], //DESC Musique, Cinéma, Société, Féminisme, Racisme...
    excerpt: { type: String },
    publicationDate: { type: Date, required: true },
    publisher: {
        _id: {
            type: SchemaTypes.ObjectId,
            ref: 'Publisher',
            required: true,
        },
        service: {
            type: String,
        },
    },
    publisherService: {type: String, required: false},
    author: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Author',
            required: true,
        },
    ],
});

const Publication = model('Publication', publicationSchema);

export default Publication;
