import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICareerApplication extends Document {
    fullName: string;
    email: string;
    phone: string;
    applyingPosition: string;
    qualification: string;
    experience: string;
    imageUrl: string;
    fileId: string;
    seen: boolean;
    createdAt: Date;
    updatedAt: Date;
}

const CareerApplicationSchema: Schema = new Schema(
    {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true },
        applyingPosition: { type: String, required: true },
        qualification: { type: String, default: '' },
        experience: { type: String, default: '' },
        imageUrl: { type: String, required: true },
        fileId: { type: String, required: true },
        seen: { type: Boolean, default: false },
    },
    {
        timestamps: true,
    }
);

const CareerApplication: Model<ICareerApplication> =
    mongoose.models.CareerApplication ||
    mongoose.model<ICareerApplication>('CareerApplication', CareerApplicationSchema);

export default CareerApplication;
