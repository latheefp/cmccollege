import mongoose, { Schema, Document } from 'mongoose';

export interface IEnquiry extends Document {
    name: string;
    phone: string;
    email?: string;
    message: string;
    status: 'Pending' | 'Read';
    createdAt: Date;
}

const EnquirySchema: Schema = new Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: false },
    message: { type: String, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Read'],
        default: 'Pending'
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IEnquiry>('Enquiry', EnquirySchema);
