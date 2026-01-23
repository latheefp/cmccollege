import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcements';
import { ensureAdmin } from '@/lib/ensureAdmin';

export async function GET() {
    try {
        await connectDB();
        const announcements = await Announcement.find({}).sort({ createdAt: -1 });
        return NextResponse.json({
            success: true,
            data: announcements,
        });
    } catch (error: any) {
        console.error('Error fetching announcements:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch announcements' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        await ensureAdmin();

        const body = await req.json();
        await connectDB();
        const announcement = await Announcement.create(body);

        return NextResponse.json({
            success: true,
            data: announcement,
        });
    } catch (error: any) {
        if (error.message === "Unauthorized" || error.message === "Forbidden") {
            return NextResponse.json({ message: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
        }
        console.error('Error creating announcement:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create announcement' },
            { status: 500 }
        );
    }
}
