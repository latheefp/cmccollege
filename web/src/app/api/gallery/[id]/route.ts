import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { ensureAdmin } from '@/lib/ensureAdmin';

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await ensureAdmin();

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
