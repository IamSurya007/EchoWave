import express from 'express';
import fetchUser, { followUser } from '../controllers/userController.js';
import verifyToken from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/:username', fetchUser);
router.post('/:username/follow',verifyToken, followUser)

export default router;