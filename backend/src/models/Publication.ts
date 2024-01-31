import { Schema, SchemaTypes, model } from 'mongoose';

const publicationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: Buffer || String },
    post_image: { type: Buffer || String },
    type: [{ type: String, required: true }], //DESC article, podcast...
    theme: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Theme',
            required: false, //TODO remove this false
        },
    ], //DESC Musique, Cinéma, Société, Féminisme, Racisme...
    excerpt: { type: String },
    publication_date: { type: Date, required: true },
    publisher: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Publisher',
            required: false, //TODO remove this false
        },
    ],
    author: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Author',
            required: false, //TODO remove this false
        },
    ],
});

const Publication = model('Publication', publicationSchema);

export default Publication;
