import {Router} from 'express';
const router = Router();
import {
  getUserData,
  createUserWithUsernameAndPassword,
  loginWithUsernameAndPassword,
} from '../../controllers/user/users.controller.js';

router.post('/login', loginWithUsernameAndPassword);
router.post('/create', createUserWithUsernameAndPassword);
router.get('/data/:id', getUserData);

export default router;
