import express from 'express';
import fetchUser, { editProfile, followUser } from '../controllers/userController.js';
import verifyToken from '../middleware/authMiddleware.js';
import { upload } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/:username', fetchUser);
router.post('/:username/follow',verifyToken, followUser)
router.post('/account/edit', verifyToken, upload.single("file"),  editProfile)

export default router;