import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAlumniAchiever extends Document {
    name: string;
    batch: string;
    achievement: string;
    description: string;
    image: string;
    fileId?: string; // ImageKit file ID for deletion
    linkedin?: string;
    createdAt: Date;
}

const AlumniAchieverSchema: Schema = new Schema({
    name: { type: String, required: true },
    batch: { type: String, required: true },
    achievement: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    fileId: { type: String },
    linkedin: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const AlumniAchiever: Model<IAlumniAchiever> =
    mongoose.models.AlumniAchiever || mongoose.model<IAlumniAchiever>('AlumniAchiever', AlumniAchieverSchema);

export default AlumniAchiever;
