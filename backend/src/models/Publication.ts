import { Schema, SchemaTypes, model } from 'mongoose';

const publicationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: Image || String },
    post_image: { type: Image || String },
    type: [{ type: String, required: true }], //DESC article, podcast...
    theme: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Theme',
            required: true,
        },
    ], //DESC Musique, Cinéma, Société, Féminisme, Racisme...
    excerpt: { type: String },
    publication_date: { type: Date, required: true },
    publisher: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Publisher',
            required: true,
        },
    ],
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
