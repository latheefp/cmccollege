import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import User from '@/models/User';
import { auth } from '@clerk/nextjs/server';

async function checkAdmin() {
    const { userId } = await auth();
    if (!userId) return false;

    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    return user?.role === 'admin';
}

export async function PATCH(
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
        const { status } = await req.json();

        await connectDB();
        const updated = await Enquiry.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updated) {
            return NextResponse.json({ message: 'Enquiry not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: updated,
        });
    } catch (error: any) {
        console.error('Error updating enquiry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update enquiry' },
            { status: 500 }
        );
    }
}
