import { Schema, SchemaTypes, model } from 'mongoose';

const authorSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    password: { type: String, required: true }, //TODO hashed password
    biography: { type: String },
    socialMedias: [{ type: String }],
    profileImage: { type: Buffer || String },
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
