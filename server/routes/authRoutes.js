import express  from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; 
import multer from 'multer';

const storage= multer.memoryStorage();;
const upload = multer({
    storage,
    limits: {
      fileSize: 25 * 1024 * 1024, // 25MB in bytes
    },
  });

const router= express.Router();

//register
router.post('/signup', upload.single("file"), registerUser)

//login
router.post('/login',upload.any(), loginUser)

export default router; 