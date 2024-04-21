import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { createPost, getPosts } from '../controllers/postController.js';
import verifyToken from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/',getPosts)
router.post('/', verifyToken, upload.single("file"), createPost)


export default router;
