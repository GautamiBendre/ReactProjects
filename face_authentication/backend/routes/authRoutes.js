import express from "express";
import multer from "multer";
import { signup, login} from "../controllers/authcontroller.js";

const router = express.Router();

// Multer Storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, "uploads/"),
    filename: (req, file, cb) =>
        cb(null, Date.now() + "-" + file.originalname)
});

const upload = multer({ storage: storage });

// Routes
router.post("/signup", upload.single("photo"), signup);
router.post("/login", login);

export default router;
