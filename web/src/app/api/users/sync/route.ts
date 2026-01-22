import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { auth, currentUser } from '@clerk/nextjs/server';

export async function POST() {
    try {
        const { userId } = await auth();

        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const userDetails = await currentUser();
        const email = userDetails?.emailAddresses[0]?.emailAddress;

        if (!email) {
            return NextResponse.json({ error: 'Email not found for user' }, { status: 400 });
        }

        await connectDB();
        const user = await User.findOneAndUpdate(
            { clerkId: userId },
            {
                clerkId: userId,
                email: email,
                $setOnInsert: { role: 'user' }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({ message: 'User synced successfully', user });
    } catch (error: any) {
        console.error('Error syncing user:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
