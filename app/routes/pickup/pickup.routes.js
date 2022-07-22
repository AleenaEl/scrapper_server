import {Router} from 'express';
const router = Router();

import {
  addPickups,
  getPickups,
  getPickupsById,
  updatePickups,
  deletePickups,
} from '../../controllers/pickup/pickup.controller.js';

router.post('/add', addPickups);
router.get('/', getPickups);
router.get('/:id', getPickupsById);
router.put('/update/:id', updatePickups);
router.delete('/delete/:id', deletePickups);

export default router;
