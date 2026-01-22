import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmissionSettings extends Document {
    startDate: Date;
    endDate: Date;
    academicYear: string;
    isActive: boolean;
    title: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}

const admissionSettingsSchema = new Schema<IAdmissionSettings>(
    {
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        academicYear: {
            type: String,
            required: true,
            trim: true,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        title: {
            type: String,
            required: false,
            default: 'Admissions Open',
        },
        description: {
            type: String,
            required: false,
        },
    },
    {
        timestamps: true,
    }
);

const AdmissionSettings: Model<IAdmissionSettings> =
    mongoose.models.AdmissionSettings ||
    mongoose.model<IAdmissionSettings>('AdmissionSettings', admissionSettingsSchema);

export default AdmissionSettings;
