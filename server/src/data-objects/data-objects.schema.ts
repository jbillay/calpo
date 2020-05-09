import * as mongoose from 'mongoose';

const Mixed = mongoose.Schema.Types.Mixed;

export const DataObjectsSchema = new mongoose.Schema({
    name: String,
    slug: { type: String, unique: true },
    fields: { type: Mixed }
}, { timestamps: true });