import { Schema, SchemaTypes, model } from 'mongoose';

const authorSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    biography: { type: String },
    contact_data: {
        type: Map,
        of: String,
    }, //DESC X, Instagram, phone, adress...
    profile_image: { type: Buffer || String },
    affiliations: [{ type: String }], //DESC Associations etc ...
    publications: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Publication',
            required: true,
        },
    ],
    collaborators: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Collaborator',
            required: false,
        },
    ],
});

const Author = model('Author', authorSchema);

export default Author;
