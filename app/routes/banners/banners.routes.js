import { Router } from 'express';
const router = Router();

import {
    addBanners,
    getBanners,
    getBannersById,
    updateBanners,
    deleteBanners,
} from '../../controllers/banners/banners.controller.js';

router.post('/add', addBanners);
router.get('/', getBanners);
router.get('/:id', getBannersById);
router.put('/update/:id', updateBanners);
router.delete('/delete/:id', deleteBanners);

export default router;
