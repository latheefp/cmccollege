import { NextResponse } from 'next/server';
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

export async function GET() {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { message: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        await connectDB();
        const enquiries = await Enquiry.find({}).sort({ createdAt: -1 });
        return NextResponse.json({
            success: true,
            data: enquiries,
        });
    } catch (error: any) {
        console.error('Error fetching enquiries:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch enquiries' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
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
