import { clerkMiddleware, requireAuth } from '@clerk/express';
import { Request, Response, NextFunction } from 'express';

export const requireAdmin = [
    // Verify the session token
    requireAuth(),
    // Check the role in metadata
    (req: Request, res: Response, next: NextFunction) => {
        const role = ((req as any).auth?.sessionClaims?.metadata as any)?.role;

        if (role !== 'admin' && role !== 'super_admin') {
            res.status(403).json({ message: 'Forbidden: Admin access required' });
            return;
        }

        next();
    }
];
