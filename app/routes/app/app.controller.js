import {Router} from 'express';
const router = Router();
import {
  getActions,
} from '../../controllers/app/app.controller.js';

router.get('/get-actions', getActions);

export default router;
