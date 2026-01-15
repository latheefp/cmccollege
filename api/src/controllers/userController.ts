import { Request, Response } from 'express';
import { createClerkClient } from '@clerk/backend';
import { User } from '../models/User';

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

export const promoteUserToAdmin = async (req: Request, res: Response) => {
    try {
        const { userId } = req.body; // Expecting Clerk ID or internal DB ID

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        // 1. Update in Database
        const user = await User.findOneAndUpdate(
            { clerkId: userId },
            { role: 'admin' },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ error: 'User not found in database' });
        }

        // 2. Update Clerk Metadata
        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'admin',
            },
        });

        res.json({ message: 'User promoted to admin successfully', user });
    } catch (error) {
        console.error('Error promoting user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const syncUser = async (req: Request, res: Response) => {
    try {
        const { userId, sessionClaims } = (req as any).auth;

        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Use 'email' directly if available, otherwise fallback (adjust based on your token)
        // Note: Clerk strict token might not have email unless requested or in session claims
        // Typically sessionClaims will have primaryEmail if configured, or you fetch from Clerk API
        // For efficiency, we will try to use sessionClaims. If email is critical and missing, fetch it.

        let email = sessionClaims?.email;

        if (!email) {
            // Fallback: Fetch user details from Clerk if email is missing in session claims
            const clerkUser = await clerkClient.users.getUser(userId);
            email = clerkUser.emailAddresses.find(e => e.id === clerkUser.primaryEmailAddressId)?.emailAddress;
        }

        if (!email) {
            return res.status(400).json({ error: 'Email not found for user' });
        }

        const user = await User.findOneAndUpdate(
            { clerkId: userId },
            {
                clerkId: userId,
                email: email,
                // Do not overwrite role if it exists, otherwise default to 'user' on insert
                $setOnInsert: { role: 'user' }
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        res.json({ message: 'User synced successfully', user });
    } catch (error) {
        console.error('Error syncing user:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const getUsers = async (req: Request, res: Response) => {
    try {
        const users = await User.find().sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};
