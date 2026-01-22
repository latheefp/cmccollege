import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { auth, createClerkClient } from '@clerk/nextjs/server';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

async function checkAdmin() {
    const { userId } = await auth();
    if (!userId) return false;

    await connectDB();
    const user = await User.findOne({ clerkId: userId });
    return user?.role === 'admin';
}

export async function POST(req: Request) {
    try {
        if (!(await checkAdmin())) {
            return NextResponse.json({ message: 'Forbidden: Admin access required' }, { status: 403 });
        }

        const { userId: targetUserId } = await req.json();

        if (!targetUserId) {
            return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
        }

        await connectDB();
        // 1. Update in Database
        const user = await User.findOneAndUpdate(
            { clerkId: targetUserId },
            { role: 'admin' },
            { new: true }
        );

        if (!user) {
            return NextResponse.json({ error: 'User not found in database' }, { status: 404 });
        }

        // 2. Update Clerk Metadata
        await clerkClient.users.updateUserMetadata(targetUserId, {
            publicMetadata: {
                role: 'admin',
            },
        });

        return NextResponse.json({ message: 'User promoted to admin successfully', user });
    } catch (error: any) {
        console.error('Error promoting user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
