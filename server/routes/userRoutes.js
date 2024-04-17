import express from 'express';
import fetchUser from '../controllers/userController.js';

const router = express.Router();

router.post('/:username', fetchUser);

export default router;