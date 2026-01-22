import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
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
        const news = await News.find({}).sort({ date: -1 });
        return NextResponse.json({
            success: true,
            data: news,
        });
    } catch (error: any) {
        console.error('Error fetching news:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch news' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { message: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        const body = await req.json();
        const newsItem = await News.create(body);

        return NextResponse.json({
            success: true,
            data: newsItem,
        });
    } catch (error: any) {
        console.error('Error creating news:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create news' },
            { status: 500 }
        );
    }
}
