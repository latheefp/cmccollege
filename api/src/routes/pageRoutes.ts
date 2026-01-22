import express from 'express';
import { getPageContent, publishInlineContent } from '../controllers/pageController';

import { requireAdmin } from '../middleware/authMiddleware';

const router = express.Router();

router.get('/:page', getPageContent);
router.post('/:page/publish-inline', requireAdmin, publishInlineContent);

export default router;
