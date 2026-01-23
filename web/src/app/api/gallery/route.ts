import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { ensureAdmin } from '@/lib/ensureAdmin';

export async function GET() {
    try {
        await connectDB();
        const gallery = await Gallery.find({}).sort({ createdAt: -1 });
        return NextResponse.json({
            success: true,
            data: gallery,
        });
    } catch (error: any) {
        console.error('Error fetching gallery:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch gallery' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await ensureAdmin();

        const body = await req.json();
        await connectDB();
        const galleryItem = await Gallery.create(body);

        return NextResponse.json({
            success: true,
            data: galleryItem,
        });
    } catch (error: any) {
        if (error.message === "Unauthorized" || error.message === "Forbidden") {
            return NextResponse.json({ message: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
        }
        console.error('Error creating gallery item:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create gallery item' },
            { status: 500 }
        );
    }
}
