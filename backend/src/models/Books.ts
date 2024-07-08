import { model, Schema, SchemaTypes } from "mongoose";

const booksSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: {type: String},
    bookPublicationDate: { type: Date, required: true },
    bookAuthor: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Author',
            required: true,
        },
    ],
    bookPublisher: {
        _id: {
            type: SchemaTypes.ObjectId,
            ref: 'Publisher',
            required: true,
        },
    },
    bookImage: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Images',
            required: false,
        },
    ],
    thumbnail: { type: Buffer || String },
    theme: [
        {
            type: SchemaTypes.ObjectId,
            ref: 'Theme',
        },
    ],
});

const Books = model('Books', booksSchema);

export default Books;