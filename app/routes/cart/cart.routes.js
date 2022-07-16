import {Router} from 'express';
const router = Router();

import {
  addCart,
  getCartById,
  updateCart,
  deleteCart,
} from '../../controllers/cart/cart.controller.js';

router.post('/add', addCart);
router.get('/:id', getCartById);
router.put('/update/:id', updateCart);
router.delete('/delete/:id', deleteCart);

export default router;
