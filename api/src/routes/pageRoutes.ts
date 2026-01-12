import express from 'express';
import { getPageContent, publishInlineContent } from '../controllers/pageController';

const router = express.Router();

router.get('/:page', getPageContent);
router.post('/:page/publish-inline', publishInlineContent);

export default router;
