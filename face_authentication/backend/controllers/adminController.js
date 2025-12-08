import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  const [rows] = await db.query("SELECT * FROM admins WHERE email=?", [email]);
  if (!rows.length) return res.status(400).json({ message: "Admin not found" });

  const admin = rows[0];

  if (!bcrypt.compareSync(password, admin.password))
    return res.status(400).json({ message: "Wrong password" });

  const token = jwt.sign(
    { id: admin.id, email: admin.email, role: "admin" },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  res.json({ message: "Admin login successful", token });
};

export const getAllStudents = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, fullName, rollNo, semester, email, photo FROM students"
  );

  res.json({ students: rows });
};

export const deleteStudent = async (req, res) => {
  await db.query("DELETE FROM students WHERE id=?", [req.params.id]);
  res.json({ message: "Student deleted" });
};
