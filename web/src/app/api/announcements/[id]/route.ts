import { NextRequest, NextResponse } from 'next/server';
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

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json({ message: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { id } = await params;
        await connectDB();
        const deleted = await Announcement.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ message: 'Announcement not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Announcement deleted successfully',
        });
    } catch (error: any) {
        console.error('Error deleting announcement:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete announcement' },
            { status: 500 }
        );
    }
}
