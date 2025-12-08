import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { getMe } from "../controllers/studentController.js";

const router = express.Router();

router.get("/me", verifyToken, getMe);

export default router;
