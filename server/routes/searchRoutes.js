import express from 'express';
import searchUsers from '../controllers/searchController.js';

const router = express.Router();

router.get('/', searchUsers)

export default router;