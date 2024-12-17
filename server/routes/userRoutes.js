import express from 'express';
import fetchUser, {
    editProfile,
    fetchFollowers,
    followUser,
    getUserFollowersByUserAccount, getUserFollowingByUserAccount,
    unfollowUser
} from '../controllers/userController.js';
import verifyToken from '../middleware/authMiddleware.js';
import {upload} from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.post('/:username', fetchUser);
router.post('/:username/follow', verifyToken, followUser);
router.post('/:username/unfollow', verifyToken, unfollowUser);
router.post('/account/edit', verifyToken, upload.single("file"), editProfile);
router.get('/fetchfollowers', verifyToken, fetchFollowers);
router.get('/secured/followers/useraccount', verifyToken, getUserFollowersByUserAccount);
router.get('/secured/following/useraccount', verifyToken, getUserFollowingByUserAccount);

export default router;
