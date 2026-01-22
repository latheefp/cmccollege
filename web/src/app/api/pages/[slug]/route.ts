import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import PageContent from '@/models/PageContent';
import User from '@/models/User';
import { auth } from '@clerk/nextjs/server';

async function checkAdmin() {
    const { userId } = await auth();
    if (!userId) return false;

    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    return user?.role === 'admin';
}

export async function GET(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        await connectDB();
        const pageContent = await PageContent.findOne({ slug });

        if (!pageContent) {
            return NextResponse.json(
                { success: false, message: 'Page content not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({
            success: true,
            data: pageContent.content,
        });
    } catch (error: any) {
        console.error('Error fetching page content:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch page content' },
            { status: 500 }
        );
    }
}

export async function POST(
    req: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { message: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        const { slug } = await params;
        const body = await req.json();

        await connectDB();
        const updated = await PageContent.findOneAndUpdate(
            { slug },
            { $set: { content: body, lastUpdated: new Date() } },
            { new: true, upsert: true }
        );

        return NextResponse.json({
            success: true,
            data: updated.content,
        });
    } catch (error: any) {
        console.error('Error updating page content:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update page content' },
            { status: 500 }
        );
    }
}
