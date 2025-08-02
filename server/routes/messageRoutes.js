import express from "express";
import {getAllChats, getLastMessages} from "../controllers/messageController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.get('/messages/allchats', getAllChats);
router.get('/useraccount/:username', verifyToken, getLastMessages)

export default router
