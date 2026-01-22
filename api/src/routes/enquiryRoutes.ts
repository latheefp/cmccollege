import { Router } from 'express';
import { createEnquiry, getEnquiries, updateEnquiryStatus } from '../controllers/enquiryController';

import { requireAdmin } from '../middleware/authMiddleware';

const router = Router();

router.route('/')
    .post(createEnquiry) // Public for users to submit enquiries
    .get(requireAdmin, getEnquiries);

router.route('/:id')
    .patch(requireAdmin, updateEnquiryStatus);

export default router;
