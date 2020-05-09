import { Document } from 'mongoose';

export interface IDataObjects extends Document {
    readonly id: string;
    readonly name: string;
    readonly slug: string;
    readonly fields: [];
}