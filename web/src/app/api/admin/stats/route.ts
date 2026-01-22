import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import mongoose from 'mongoose';
import Enquiry from '@/models/Enquiry';
import Announcements from '@/models/Announcements';
import Gallery from '@/models/Gallery';
import News from '@/models/News';
import User from '@/models/User';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
}

async function connectDB() {
    if (mongoose.connection.readyState >= 1) return;
    return mongoose.connect(MONGODB_URI);
}

export async function GET() {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Verify admin role
        const currentUser = await User.findOne({ clerkId: userId });
        if (!currentUser || currentUser.role !== 'admin') {
            return NextResponse.json({ success: false, error: 'Admin access required' }, { status: 403 });
        }

        // Fetch counts in parallel
        const [enquiryCount, announcementCount, galleryCount, newsCount, userCount] = await Promise.all([
            Enquiry.countDocuments(),
            Announcements.countDocuments(),
            Gallery.countDocuments(),
            News.countDocuments(),
            User.countDocuments()
        ]);

        // Get latest items for activity
        const pendingEnquiries = await Enquiry.find({ status: 'Pending' })
            .sort({ createdAt: -1 })
            .limit(4);

        const recentAnnouncements = await Announcements.find()
            .sort({ createdAt: -1 })
            .limit(3);

        // Calculate this month's enquiries
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        const enquiriesThisMonth = await Enquiry.countDocuments({
            createdAt: { $gte: startOfMonth }
        });

        return NextResponse.json({
            success: true,
            data: {
                counts: {
                    enquiries: enquiryCount,
                    announcements: announcementCount,
                    gallery: galleryCount,
                    news: newsCount,
                    users: userCount,
                },
                enquiriesThisMonth,
                pendingEnquiries,
                recentAnnouncements
            }
        });

    } catch (error: any) {
        console.error('Stats API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
