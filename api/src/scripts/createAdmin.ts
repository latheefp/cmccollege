import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createClerkClient } from '@clerk/backend';
import { User } from '../models/User';
import connectDB from '../config/db';

dotenv.config();

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY });

const createAdmin = async () => {
    const email = process.argv[2]; // Get email from command line argument

    if (!email) {
        console.error('Please provide an email address: npm run create:admin -- <email>');
        process.exit(1);
    }

    await connectDB();

    try {
        // 1. Find user in MongoDB
        const user = await User.findOne({ email });

        if (!user) {
            console.error(`User with email ${email} not found in database. Please sign up first.`);
            process.exit(1);
        }

        // 2. Update Role in MongoDB
        user.role = 'admin';
        await user.save();
        console.log(`Updated MongoDB role for ${email}`);

        // 3. Update Clerk Metadata
        await clerkClient.users.updateUserMetadata(user.clerkId as string, {
            publicMetadata: {
                role: 'admin',
            },
        });
        console.log(`Updated Clerk metadata for ${email}`);

        console.log('User successfully promoted to admin!');
    } catch (error) {
        console.error('Error promoting user:', error);
    } finally {
        await mongoose.disconnect();
    }
};

createAdmin();
