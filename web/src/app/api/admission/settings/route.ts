import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import AdmissionSettings from '@/models/AdmissionSettings';
import { ensureAdmin } from '@/lib/ensureAdmin';

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

export async function PUT(req: NextRequest) {
    try {
        await ensureAdmin();

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
