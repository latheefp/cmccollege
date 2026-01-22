import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import User from '@/models/User';
import { auth } from '@clerk/nextjs/server';

async function checkAdmin() {
    const { userId } = await auth();
    if (!userId) return false;

    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    return user?.role === 'admin';
}

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

export async function POST(req: Request) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { message: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        const body = await req.json();
        const galleryItem = await Gallery.create(body);

        return NextResponse.json({
            success: true,
            data: galleryItem,
        });
    } catch (error: any) {
        console.error('Error creating gallery item:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create gallery item' },
            { status: 500 }
        );
    }
}
