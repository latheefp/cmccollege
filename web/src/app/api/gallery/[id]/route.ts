import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { ensureAdmin } from '@/lib/ensureAdmin';
import ImageKit from "imagekit";

const imagekit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY || "",
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY || "",
    urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT || "",
});

export async function DELETE(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await ensureAdmin();

        const { id } = await params;
        await connectDB();

        // Find the gallery item first to get the fileId
        const galleryItem = await Gallery.findById(id);

        if (!galleryItem) {
            return NextResponse.json({ message: 'Gallery item not found' }, { status: 404 });
        }

        // Delete image from ImageKit
        if (galleryItem.fileId) {
            try {
                await imagekit.deleteFile(galleryItem.fileId);
            } catch (error) {
                console.error("Error deleting file from ImageKit:", error);
            }
        }

        // Delete from Database
        await Gallery.findByIdAndDelete(id);

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
