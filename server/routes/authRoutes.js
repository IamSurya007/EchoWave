import express  from 'express';
import { registerUser, loginUser } from '../controllers/authController.js'; 
import multer from 'multer';
import { upload } from '../middleware/uploadMiddleware.js';


const router= express.Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Logs in a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successful login
 *       401:
 *         description: Unauthorized
 */

//register
router.post('/signup', upload.single("file"), registerUser)

//login
router.post('/login',upload.any(), loginUser)


export default router; 