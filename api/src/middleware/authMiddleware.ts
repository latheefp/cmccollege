import { clerkMiddleware, requireAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export const requireAdmin = [
    // Verify the session token
    requireAuth(),
    // Check the role in database
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { userId } = (req as any).auth();

            if (!userId) {
                res.status(401).json({ message: 'Unauthorized' });
                return;
            }

            const user = await User.findOne({ clerkId: userId });

            if (!user || (user.role !== 'admin' && user.role !== 'super_admin')) {
                res.status(403).json({ message: 'Forbidden: Admin access required' });
                return;
            }

            next();
        } catch (error) {
            console.error('Auth Middleware Error:', error);
            res.status(500).json({ message: 'Server Error during authentication' });
        }
    }
];
