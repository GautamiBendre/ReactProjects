import db from "../config/db.js";

export const getMe = async (req, res) => {
  const [rows] = await db.query(
    "SELECT id, fullName, rollNo, semester, email, photo FROM students WHERE id=?",
    [req.user.id]
  );
  res.json({ student: rows[0] });
};
