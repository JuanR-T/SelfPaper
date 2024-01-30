import { Schema, model } from 'mongoose';

const publisherSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    type: { type: String, required: true }, //DESC newspaper, music platform...
    location: { type: String },
    founded_at: { type: Date },
});

const Publisher = model('Publisher', publisherSchema);

export default Publisher;
