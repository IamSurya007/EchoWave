import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { createPost, getPosts, likePost } from '../controllers/postController.js';
import verifyToken from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/',getPosts)
router.post('/', verifyToken, upload.single("file"), createPost)
router.post('/:postsId/like', verifyToken, likePost)


export default router;
