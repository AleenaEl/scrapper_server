import { Router } from 'express';
const router = Router();
import {
  getUserData,
  phoneAuthenticateLogin,
  phoneAuthenticateVerify,
} from '../../controllers/user/users.controller.js';

router.post('/login', phoneAuthenticateLogin);
router.post('/verify', phoneAuthenticateVerify);
router.get('/', getUserData);

export default router;
