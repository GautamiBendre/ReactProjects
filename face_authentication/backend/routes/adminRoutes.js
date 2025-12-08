import express from "express";
import { adminLogin, getAllStudents, deleteStudent } from "../controllers/adminController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", adminLogin);
router.get("/students", verifyToken, verifyAdmin, getAllStudents);
router.delete("/students/:id", verifyToken, verifyAdmin, deleteStudent);

export default router;
