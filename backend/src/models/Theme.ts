import { Schema, SchemaTypes, model } from 'mongoose';

const themeSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    image: { type: Image || String },
});

const Theme = model('Theme', themeSchema);

export default Theme;
