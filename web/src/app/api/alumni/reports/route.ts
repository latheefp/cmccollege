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

export async function GET() {
    try {
        await dbConnect();
        const reports = await AlumniReport.find({}).sort({ createdAt: -1 });
        return NextResponse.json({ success: true, data: reports });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to fetch reports' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        await dbConnect();
        const body = await request.json();
        const report = await AlumniReport.create(body);
        return NextResponse.json({ success: true, data: report }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Failed to create report' }, { status: 500 });
    }
}
