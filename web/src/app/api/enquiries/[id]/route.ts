import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { ensureAdmin } from '@/lib/ensureAdmin';

export async function PATCH(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await ensureAdmin();

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
