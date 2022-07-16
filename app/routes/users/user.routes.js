import {Router} from 'express';
const router = Router();
import {
  getUserData,
  loginWithUsernameAndPassword,
  createUserWithUsernameAndPassword,
  hello,
} from '../../controllers/user/users.controller.js';

router.post('/login', loginWithUsernameAndPassword);
router.post('/create', createUserWithUsernameAndPassword);
router.get('/data/:id', getUserData);
router.get('/hello', hello);
export default router;
