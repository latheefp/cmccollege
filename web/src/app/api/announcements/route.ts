import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Announcement from '@/models/Announcements';
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

export async function POST(req: Request) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json({ message: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const body = await req.json();
        const announcement = await Announcement.create(body);

        return NextResponse.json({
            success: true,
            data: announcement,
        });
    } catch (error: any) {
        console.error('Error creating announcement:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create announcement' },
            { status: 500 }
        );
    }
}
