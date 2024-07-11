import { Schema, SchemaTypes, model } from 'mongoose';

const imageSchema = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    publications: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Publication',
            required: false,
        },
    ],
});

const Images = model('Images', imageSchema);

export default Images;
