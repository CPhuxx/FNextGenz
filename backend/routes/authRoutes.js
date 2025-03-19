const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const db = require("../config/db"); // เชื่อมต่อฐานข้อมูล

// ✅ POST request for registration
router.post("/register", async (req, res) => {
  const { username_customer, email, password } = req.body;

  if (!username_customer || !email || !password) {
    return res.status(400).json({ success: false, message: "❌ กรุณากรอกข้อมูลให้ครบถ้วน" });
  }

  try {
    db.query("SELECT id FROM users WHERE email = ?", [email], async (err, results) => {
      if (results.length > 0) {
        return res.status(400).json({ success: false, message: "❌ อีเมลนี้ถูกใช้งานแล้ว" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      db.query(
        "INSERT INTO users (username_customer, email, password, credit) VALUES (?, ?, ?, 0)", 
        [username_customer, email, hashedPassword], 
        (err, result) => {
          if (err) {
            return res.status(500).json({ success: false, message: "❌ เกิดข้อผิดพลาดกับฐานข้อมูล" });
          }
          res.status(201).json({ success: true, message: "✅ สมัครสมาชิกสำเร็จ" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
});

// ✅ POST request for login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, message: "❌ กรุณากรอกอีเมลและรหัสผ่าน" });
  }

  try {
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
      if (err || results.length === 0) {
        return res.status(401).json({ success: false, message: "❌ ไม่พบผู้ใช้" });
      }

      const user = results[0];
      const isMatch = await bcrypt.compare(password, user.password);
      
      if (!isMatch) {
        return res.status(401).json({ success: false, message: "❌ รหัสผ่านไม่ถูกต้อง" });
      }

      const token = jwt.sign(
        { id: user.id, username_customer: user.username_customer, role: user.role }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
      );

      res.json({
        success: true,
        token,
        user: { id: user.id, username_customer: user.username_customer, email: user.email, credit: user.credit, role: user.role }
      });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "❌ เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์" });
  }
});

module.exports = router;
