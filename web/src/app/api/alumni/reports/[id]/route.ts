import { NextResponse } from 'next/server';
import mongoose from 'mongoose';
import AlumniReport from '@/models/AlumniReport';
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
        const report = await AlumniReport.findById(id);

        if (!report) {
            return NextResponse.json({ success: false, message: 'Report not found' }, { status: 404 });
        }

        // Delete file from ImageKit if fileId exists
        if (report.fileId) {
            try {
                await imagekit.deleteFile(report.fileId);
            } catch (error) {
                console.error("ImageKit Deletion Error:", error);
            }
        }

        await AlumniReport.findByIdAndDelete(id);
        return NextResponse.json({ success: true, message: 'Report deleted successfully' });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to delete report' }, { status: 500 });
    }
}
