import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdmissionSettings from '@/models/AdmissionSettings';
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
        let settings = await AdmissionSettings.findOne();

        if (!settings) {
            // Create default settings if none exist
            settings = await AdmissionSettings.create({
                startDate: new Date(),
                endDate: new Date(new Date().setMonth(new Date().getMonth() + 3)),
                academicYear: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
                isActive: true,
                title: 'Admissions Open',
                description:
                    'Secure your future with our specialized Undergraduate (UG) and Postgraduate (PG) programs combined with Islamic values.',
            });
        }

        return NextResponse.json(settings);
    } catch (error: any) {
        console.error('Error fetching admission settings:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to fetch admission settings' },
            { status: 500 }
        );
    }
}

export async function PUT(req: Request) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json(
                { message: 'Forbidden: Admin access required' },
                { status: 403 }
            );
        }

        const body = await req.json();
        await connectDB();

        let settings = await AdmissionSettings.findOne();
        if (settings) {
            settings = await AdmissionSettings.findByIdAndUpdate(settings._id, body, {
                new: true,
            });
        } else {
            settings = await AdmissionSettings.create(body);
        }

        return NextResponse.json(settings);
    } catch (error: any) {
        console.error('Error updating admission settings:', error);
        return NextResponse.json(
            { success: false, error: 'Failed to update admission settings' },
            { status: 500 }
        );
    }
}
