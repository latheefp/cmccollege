import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import News from '@/models/News';
import { ensureAdmin } from '@/lib/ensureAdmin';

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

export async function POST(req: NextRequest) {
    try {
        await ensureAdmin();

        const body = await req.json();
        await connectDB();
        const newsItem = await News.create(body);

        return NextResponse.json({
            success: true,
            data: newsItem,
        });
    } catch (error: any) {
        if (error.message === "Unauthorized" || error.message === "Forbidden") {
            return NextResponse.json({ message: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
        }
        console.error('Error creating news:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create news' },
            { status: 500 }
        );
    }
}
