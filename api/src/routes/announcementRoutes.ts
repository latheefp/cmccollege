import { Router } from 'express';
import {
    createAnnouncement,
    getAnnouncements,
    deleteAnnouncement,
} from '../controllers/announcementController';

import { requireAdmin } from '../middleware/authMiddleware';

const router = Router();

router.route('/')
    .post(requireAdmin, createAnnouncement)
    .get(getAnnouncements);

router.route('/:id')
    .delete(requireAdmin, deleteAnnouncement);

export default router;
