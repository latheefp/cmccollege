import { Router } from 'express';
import { createEnquiry, getEnquiries, updateEnquiryStatus } from '../controllers/enquiryController';

const router = Router();

router.route('/')
    .post(createEnquiry)
    .get(getEnquiries);

router.route('/:id')
    .patch(updateEnquiryStatus);

export default router;
