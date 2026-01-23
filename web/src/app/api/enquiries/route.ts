import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Enquiry from '@/models/Enquiry';
import { ensureAdmin } from '@/lib/ensureAdmin';

export async function GET() {
    try {
        await ensureAdmin();

        await connectDB();
        const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json({
            success: true,
            data: enquiries,
        });
    } catch (error: any) {
        if (error.message === "Unauthorized" || error.message === "Forbidden") {
            return NextResponse.json({ message: error.message }, { status: error.message === "Unauthorized" ? 401 : 403 });
        }
        console.error('Error fetching enquiries:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch enquiries' },
            { status: 500 }
        );
    }
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        await connectDB();
        const enquiry = await Enquiry.create(body);

        return NextResponse.json({
            success: true,
            data: enquiry,
        });
    } catch (error: any) {
        console.error('Error creating enquiry:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to create enquiry' },
            { status: 500 }
        );
    }
}
