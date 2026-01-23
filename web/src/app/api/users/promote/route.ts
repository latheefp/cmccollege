import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { clerkClient } from '@clerk/nextjs/server';
import { ensureAdmin } from '@/lib/ensureAdmin';

export async function POST(req: NextRequest) {
    try {
        await ensureAdmin();

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
        const client = await clerkClient();
        await client.users.updateUserMetadata(targetUserId, {
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
