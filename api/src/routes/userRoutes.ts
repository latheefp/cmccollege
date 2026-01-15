import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { syncUser, getUsers, promoteUserToAdmin } from '../controllers/userController';
import { requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Route to sync user (UPSERT)
router.post('/sync', requireAuth(), syncUser);

// Route to get all users (TEMPORARILY PUBLIC for debugging)
router.get('/', getUsers);

// Route to promote user (TEMPORARILY PUBLIC for debugging)
router.post('/promote', promoteUserToAdmin);

export default router;
