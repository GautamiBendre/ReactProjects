import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendMail } from "../utils/mailer.js";

export const signup = async (req, res) => {
  try {
    const { fullName, rollNo, semester, email, password } = req.body;
    const photo = req.file ? req.file.filename : null;

    const [exists] = await db.query("SELECT id FROM students WHERE email=?", [email]);
    if (exists.length) return res.status(400).json({ message: "Email already exists" });

    const hashed = bcrypt.hashSync(password, 10);

    await db.query(
      "INSERT INTO students (fullName, rollNo, semester, email, password, photo) VALUES (?,?,?,?,?,?)",
      [fullName, rollNo, semester, email, hashed, photo]
    );

    res.json({ message: "Signup successful" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [rows] = await db.query("SELECT * FROM students WHERE email=?", [email]);
    if (!rows.length) return res.status(400).json({ message: "User not found" });

    const user = rows[0];

    if (!bcrypt.compareSync(password, user.password))
      return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: "student", fullName: user.fullName },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const [rows] = await db.query("SELECT * FROM students WHERE email=?", [email]);
    if (!rows.length) return res.status(400).json({ message: "User not found" });

    const resetToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: "15m" });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    await sendMail(email, "Reset Password", `<p>Click link: <a href="${resetUrl}">Reset Password</a></p>`);

    res.json({ message: "Reset link sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashed = bcrypt.hashSync(newPassword, 10);

    await db.query("UPDATE students SET password=? WHERE email=?", [hashed, decoded.email]);

    res.json({ message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ message: "Invalid or expired token" });
  }
};
