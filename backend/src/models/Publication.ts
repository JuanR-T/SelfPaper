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
            _id: {
                type: SchemaTypes.ObjectId,
                ref: 'Publisher',
                required: true,
            },
            service: {
                type: String,
            },
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
