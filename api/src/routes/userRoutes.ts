import { Router } from 'express';
import { requireAuth } from '@clerk/express';
import { syncUser, getUsers, promoteUserToAdmin } from '../controllers/userController';
import { requireAdmin } from '../middleware/authMiddleware';

const router = Router();

// Route to sync user (UPSERT)
router.post('/sync', requireAuth(), syncUser);

// Route to get all users
router.get('/', requireAdmin, getUsers);

// Route to promote user
router.post('/promote', requireAdmin, promoteUserToAdmin);

export default router;
