import express from 'express';
import { upload } from '../middleware/uploadMiddleware.js';
import { addComment, createPost, getComments, getPosts, likePost, unlike } from '../controllers/postController.js';
import verifyToken from '../middleware/authMiddleware.js';


const router = express.Router();

router.get('/', verifyToken, getPosts)
router.post('/', verifyToken, upload.single("file"), createPost)
router.post('/:postsId/like', verifyToken, likePost)
router.post('/:postsId/unlike', verifyToken, unlike)
router.post('/:postsId/addcomment', verifyToken, addComment)
router.post('/:postId/comments', getComments ) 


export default router;
