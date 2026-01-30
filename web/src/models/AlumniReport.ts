import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAlumniReport extends Document {
    title: string;
    fileUrl: string;
    fileId?: string; // ImageKit file ID for deletion
    date?: string; // Optional custom date string or use createdAt
    createdAt: Date;
}

const AlumniReportSchema: Schema = new Schema({
    title: { type: String, required: true },
    fileUrl: { type: String, required: true },
    fileId: { type: String },
    date: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const AlumniReport: Model<IAlumniReport> =
    mongoose.models.AlumniReport || mongoose.model<IAlumniReport>('AlumniReport', AlumniReportSchema);

export default AlumniReport;
