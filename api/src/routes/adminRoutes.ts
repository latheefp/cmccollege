import { Router, Request, Response } from 'express';
import { requireAdmin } from '../middleware/authMiddleware';
import { promoteUserToAdmin } from '../controllers/userController';

const router = Router();

// Example protected route
router.get('/stats', ...requireAdmin, (req: Request, res: Response) => {
    res.json({
        message: 'Welcome to the admin stats dashboard',
        stats: {
            users: 100,
            active: 50
        }
    });
});

// Route to promote a user (protected)
router.post('/promote', ...requireAdmin, promoteUserToAdmin);

export default router;
