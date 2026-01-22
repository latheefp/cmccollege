import { Router } from 'express';
import {
    createImage,
    getImages,
    deleteImage,
} from '../controllers/galleryController';

import { requireAdmin } from '../middleware/authMiddleware';

const router = Router();

router.route('/')
    .post(requireAdmin, createImage)
    .get(getImages);

router.route('/:id')
    .delete(requireAdmin, deleteImage);

export default router;
