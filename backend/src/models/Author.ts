import { Schema, SchemaTypes, model } from 'mongoose';

const authorSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true },
    phone_number: { type: String, required: true },
    password: { type: String, required: true }, //TODO hashed password
    biography: { type: String },
    social_medias: [{ type: String }],
    profile_image: { type: Buffer || String },
    affiliations: [{ type: String }], //DESC Associations etc ...
    publications: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Publication',
            required: false,
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
