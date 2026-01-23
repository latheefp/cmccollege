import { NextRequest, NextResponse } from 'next/server';
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

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { message: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        const { id } = await params;
        await connectDB();
        const deleted = await Gallery.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ message: 'Gallery item not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Gallery item deleted successfully',
        });
    } catch (error: any) {
        console.error('Error deleting gallery item:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete gallery item' },
            { status: 500 }
        );
    }
}
