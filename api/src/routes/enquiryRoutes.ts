import { Router } from 'express';
import { createEnquiry, getEnquiries } from '../controllers/enquiryController';

const router = Router();

router.route('/')
    .post(createEnquiry)
    .get(getEnquiries);

export default router;
