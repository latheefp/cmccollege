// @ts-nocheck
// @ts-nocheck
// @ts-nocheck
import mongoose from 'mongoose';
import User from '../models/User';
import dotenv from 'dotenv';
import path from 'path';

// Load env from project root or web root
const envPath = path.resolve(process.cwd(), '.env.local');
dotenv.config({ path: envPath });

// Fallback if MONGODB_URI is still not found (e.g. if run from a different subdir)
if (!process.env.MONGODB_URI) {
    dotenv.config({ path: path.resolve(__dirname, '../../.env.local') });
}

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('MONGODB_URI is not defined. Checked:', envPath);
    process.exit(1);
}

const promoteEmail = process.argv[2];

if (!promoteEmail) {
    console.error('Please provide an email to promote: npx tsx src/scripts/promoteAdmin.ts user@example.com');
    process.exit(1);
}

async function promote() {
    try {
        await mongoose.connect(MONGODB_URI!);
        console.log('Connected to MongoDB');

        const updatedUser = await User.findOneAndUpdate(
            { email: promoteEmail },
            { role: 'admin' },
            { new: true }
        );

        if (updatedUser) {
            console.log(`User ${promoteEmail} promoted to admin in MongoDB successfully.`);

            // Update Clerk metadata for immediate middleware recognition
            const { createClerkClient } = await import('@clerk/nextjs/server');
            const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });
            await clerkClient.users.updateUserMetadata(updatedUser.clerkId, {
                publicMetadata: {
                    role: 'admin',
                },
            });
            console.log(`User ${promoteEmail} Clerk metadata updated successfully.`);
        } else {
            console.error(`User ${promoteEmail} not found. Ensure they have signed in at least once.`);
        }
    } catch (error) {
        console.error('Promotion error:', error);
    } finally {
        await mongoose.disconnect();
    }
}

promote();
