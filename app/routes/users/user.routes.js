import {Router} from 'express';
const router = Router();
import {
  getUserData,
  createUserWithUsernameAndPassword,
  loginWithUsernameAndPassword,
  shadowResponse,
} from '../../controllers/user/users.controller.js';

router.post('/login', loginWithUsernameAndPassword);
router.post('/create', createUserWithUsernameAndPassword);
router.get('/data/:id', getUserData);
router.get('/shadow', shadowResponse);

export default router;
