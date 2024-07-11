import { Schema, model } from 'mongoose';

const publisherSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    services: [{ type: String }], //DESC if publisher is devided in different services.
    type: { type: String, required: true }, //DESC newspaper, music platform...
    location: { type: String },
    foundedAt: { type: Date },
    service: {
        type: String,
        required: false,
    },
});

const Publisher = model('Publisher', publisherSchema);

export default Publisher;
