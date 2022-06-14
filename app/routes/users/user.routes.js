import { Router } from 'express';
const router = Router();
import {
  getUserData,
} from '../../controllers/user/users.controller.js';

router.get('/', getUserData);

export default router;
