import express from "express";
import { getAllMessages, sendMessage } from "../controller/messageController.js";
import { isAdminAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// POST /api/v1/message/send
router.post("/send", sendMessage);

// GET /api/v1/message/getall (admin only)
router.get("/getall", isAdminAuthenticated, getAllMessages);

export default router;
