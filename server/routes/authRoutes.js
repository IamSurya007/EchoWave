import express  from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; 

const router= express.Router();

//register
router.post('/signup', registerUser)

//login
router.post('/login', loginUser)

export default router; 