import mongoose from 'mongoose';

const pageContentSchema = new mongoose.Schema({
    page: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    content: {
        type: Map,
        of: mongoose.Schema.Types.Mixed,
        default: {}
    },
    lastUpdated: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

export const PageContent = mongoose.model('PageContent', pageContentSchema);
