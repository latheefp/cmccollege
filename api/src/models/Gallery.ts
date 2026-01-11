import mongoose, { Schema, Document } from 'mongoose';

export interface IGallery extends Document {
    title: string;
    imageUrl: string;
    fileId?: string;
    category: 'Campus' | 'Events' | 'Hostel' | 'Classroom';
    createdAt: Date;
}

const GallerySchema: Schema = new Schema({
    title: { type: String, required: true },
    imageUrl: { type: String, required: true },
    fileId: { type: String },
    category: {
        type: String,
        required: true,
        enum: ['Campus', 'Events', 'Hostel', 'Classroom']
    },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IGallery>('Gallery', GallerySchema);
