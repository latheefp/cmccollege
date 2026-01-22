import { requireAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';

export const requireAdmin = [
    requireAuth(),

    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).auth?.userId;

            if (!userId) {
                return res.status(401).json({ message: 'Unauthorized' });
            }

            const user = await User.findOne({ clerkId: userId });

            if (!user || user.role !== 'admin') {
                return res.status(403).json({
                    message: 'Forbidden: Admin access required',
                });
            }

            next();

        } catch (error) {
            console.error('Admin Middleware Error:', error);
            return res.status(500).json({
                message: 'Server Error during authentication',
            });
        }
    }
];
