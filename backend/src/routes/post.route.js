import {Router} from 'express';
import {createPost, getPosts, getPostById, updatePost, deletePost, deletePostById} from '../controllers/post.controller.js';
import {protect} from '../middleware/auth.middleware.js';
import {isAdmin} from '../middleware/admin.js';

const router = Router();

router.post('/create',protect, createPost);           // POST /api/v1/posts
router.get('/', getPosts);             // GET /api/v1/posts
router.get('/:id', getPostById);       // GET /api/v1/posts/:id
router.patch('/:id',protect, updatePost);      // PATCH /api/v1/posts/:id
router.delete('/delete',protect, deletePost);
router.delete('/delete/:id',protect, deletePostById);

export default router;