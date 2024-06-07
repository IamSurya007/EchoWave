import express  from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; 
import multer from 'multer';
import { upload } from '../middleware/uploadMiddleware.js';


const router= express.Router();

//register
router.post('/signup', upload.single("file"), registerUser)

//login
router.post('/login',upload.any(), loginUser)


export default router; 