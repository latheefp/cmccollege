import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import AlumniAchiever from '@/models/AlumniAchiever';
import ImageKit from 'imagekit';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

async function dbConnect() {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(MONGODB_URI as string);
}

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || '',
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || '',
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || '',
});

export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await dbConnect();
        const { id } = await params;
        const achiever = await AlumniAchiever.findById(id);

        if (!achiever) {
            return NextResponse.json({ success: false, message: 'Achiever not found' }, { status: 404 });
        }

        // Delete image from ImageKit if fileId exists
        if (achiever.fileId) {
            try {
                await imagekit.deleteFile(achiever.fileId);
            } catch (error) {
                console.error("ImageKit Deletion Error:", error);
                // Continue with DB deletion even if ImageKit fails
            }
        }

        await AlumniAchiever.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Achiever deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to delete achiever' }, { status: 500 });
    }
}
