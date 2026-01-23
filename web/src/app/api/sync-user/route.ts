import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { auth, currentUser, clerkClient, verifyToken } from '@clerk/nextjs/server';

export async function GET() {
    return NextResponse.json({ message: 'Sync API is alive' });
}

export async function POST(req: NextRequest) {
    console.log('>>> [Sync API] POST request received');
    const authHeader = req.headers.get('authorization');

    try {
        const body = await req.json().catch(() => ({}));
        const { clerkId: bodyClerkId, email: bodyEmail } = body;

        await connectDB();

        console.log('>>> [Sync API] Attempting auth()...');
        const authData = await auth();
        let userId: string | null | undefined = authData.userId;
        console.log('>>> [Sync API] auth() userId:', userId);

        // Fallback 1: Manual verifyToken
        if (!userId && authHeader) {
            console.log('>>> [Sync API] auth() failed. Trying manual verifyToken...');
            const token = authHeader.replace('Bearer ', '');
            try {
                const verified = await verifyToken(token, {
                    secretKey: process.env.CLERK_SECRET_KEY
                });
                userId = verified.sub;
                console.log('>>> [Sync API] Manual verification SUCCESS. UserId:', userId);
            } catch (err: any) {
                console.warn('>>> [Sync API] Manual verification FAILED:', err.message);
            }
        }

        // Fallback 2: Development-only body trust
        if (!userId && process.env.NODE_ENV === 'development' && bodyClerkId) {
            console.log('>>> [Sync API] DEV MODE: Using clerkId from body as fallback');
            userId = bodyClerkId;
        }

        // Fallback 3: currentUser()
        if (!userId) {
            console.log('>>> [Sync API] Trying currentUser()...');
            const userDetails = await currentUser();
            userId = userDetails?.id;
        }

        console.log('>>> [Sync API] Final Resolved UserId:', userId);

        if (!userId) {
            console.warn('>>> [Sync API] All auth methods failed');
            return NextResponse.json({
                error: 'Unauthorized',
                details: 'No userId found in any method.',
                debug: {
                    has_auth_header: !!authHeader,
                    has_body_id: !!bodyClerkId,
                    node_env: process.env.NODE_ENV
                }
            }, { status: 401 });
        }

        // Now we definitely have a userId
        const client = await clerkClient();
        const fullUser = await client.users.getUser(userId);

        // Fetch email and role from Clerk
        const email = bodyEmail || fullUser.emailAddresses[0]?.emailAddress;
        const role = (fullUser.publicMetadata as any)?.role || 'user';

        if (!email) {
            return NextResponse.json({ error: 'Email not found' }, { status: 400 });
        }

        console.log('>>> [Sync API] Synchronizing user records for:', email, '| Role:', role);

        // Update DB with the role from Clerk
        const dbUser = await User.findOneAndUpdate(
            { clerkId: userId },
            {
                clerkId: userId,
                email: email,
                role: role // Clerk is the source of truth
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        return NextResponse.json({
            message: 'User synced successfully',
            user: {
                id: dbUser._id,
                email: dbUser.email,
                role: dbUser.role
            }
        });
    } catch (error: any) {
        console.error('>>> [Sync API] CRITICAL ERROR:', error);
        return NextResponse.json(
            { error: 'Internal server error', details: error.message },
            { status: 500 }
        );
    }
}
