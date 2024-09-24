import { Schema, SchemaTypes, model } from 'mongoose';

const imageSchema = new Schema({
    type: { type: String, required: true },
    format: {type: String, required: true},
    image: { type: Buffer, required: true },
    publications: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Publication',
            required: true,
        },
    ],
});

const Images = model('Images', imageSchema);

export default Images;