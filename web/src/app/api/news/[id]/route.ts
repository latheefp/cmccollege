import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { ensureAdmin } from '@/lib/ensureAdmin';

export async function PUT(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await ensureAdmin();

        const { id } = await params;
        const body = await req.json();
        await connectDB();
        const updated = await News.findByIdAndUpdate(id, body, { new: true });

        if (!updated) {
            return NextResponse.json({ message: 'News item not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            data: updated,
        });
    } catch (error: any) {
        console.error('Error updating news:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update news' },
            { status: 500 }
        );
    }
}

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await ensureAdmin();

        const { id } = await params;
        await connectDB();
        const deleted = await News.findByIdAndDelete(id);

        if (!deleted) {
            return NextResponse.json({ message: 'News item not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'News item deleted successfully',
        });
    } catch (error: any) {
        console.error('Error deleting news:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to delete news' },
            { status: 500 }
        );
    }
}
