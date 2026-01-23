import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { auth, currentUser, clerkClient, verifyToken } from '@clerk/nextjs/server';

export async function GET() {
    return NextResponse.json({ message: 'Sync API is alive' });
}

export async function POST(req: Request) {
    const authHeader = req.headers.get('authorization');

    try {
        const body = await req.json().catch(() => ({}));
        const { clerkId: bodyClerkId, email: bodyEmail } = body;

        await connectDB();

        const authData = await auth();
        let userId: string | null | undefined = authData.userId;

        // Fallback 1: Manual verifyToken
        if (!userId && authHeader) {
            const token = authHeader.replace('Bearer ', '');
            try {
                const verified = await verifyToken(token, {
                    secretKey: process.env.CLERK_SECRET_KEY
                });
                userId = verified.sub;
            } catch (err: any) {
                // Verification failed
            }
        }

        // Fallback 2: Development-only body trust
        if (!userId && process.env.NODE_ENV === 'development' && bodyClerkId) {
            userId = bodyClerkId;
        }

        // Fallback 3: currentUser()
        if (!userId) {
            const userDetails = await currentUser();
            userId = userDetails?.id;
        }

        if (!userId) {
            return NextResponse.json({
                error: 'Unauthorized',
                details: 'No userId found in any method.',
            }, { status: 401 });
        }

        const client = await clerkClient();

        let email = bodyEmail;
        if (!email) {
            try {
                const fullUser = await client.users.getUser(userId);
                email = fullUser.emailAddresses[0]?.emailAddress;
            } catch (err) {
                // Email fetch failed
            }
        }

        if (!email) {
            return NextResponse.json({ error: 'Email not found' }, { status: 400 });
        }

        const dbUser = await User.findOneAndUpdate(
            { clerkId: userId },
            {
                clerkId: userId,
                email: email,
                $setOnInsert: { role: 'user' }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        await client.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: dbUser.role,
            },
        });

        return NextResponse.json({
            message: 'User synced successfully',
            user: {
                id: dbUser._id,
                email: dbUser.email,
                role: dbUser.role
            }
        });
    } catch (error: any) {
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
