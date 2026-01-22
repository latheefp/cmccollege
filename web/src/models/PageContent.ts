import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPageContent extends Document {
    page: string;
    slug: string;
    content: Map<string, any>;
    lastUpdated: Date;
    createdAt: Date;
    updatedAt: Date;
}

const pageContentSchema = new Schema<IPageContent>(
    {
        page: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },
        content: {
            type: Map,
            of: mongoose.Schema.Types.Mixed,
            default: {},
        },
        lastUpdated: {
            type: Date,
            default: Date.now,
        },
    },
    { timestamps: true }
);

const PageContent: Model<IPageContent> =
    mongoose.models.PageContent ||
    mongoose.model<IPageContent>('PageContent', pageContentSchema);

export default PageContent;
