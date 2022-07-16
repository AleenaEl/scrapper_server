import {Router} from 'express';
const router = Router();

import {
  addPosts,
  getPosts,
  getPostsById,
  updatePosts,
  deletePosts,
} from '../../controllers/post/post.controller.js';

router.post('/add', addPosts);
router.get('/', getPosts);
router.get('/:id', getPostsById);
router.put('/update/:id', updatePosts);
router.delete('/delete/:id', deletePosts);

export default router;
