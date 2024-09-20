import { Schema, SchemaTypes, model } from 'mongoose';

const imageSchema = new Schema({
    type: { type: String, required: true },
    image: { type: Buffer, required: true },
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
