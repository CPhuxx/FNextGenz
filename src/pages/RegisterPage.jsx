import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const RegisterPage = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ ฟังก์ชันกดสมัครสมาชิก
  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("/api/auth/register", {
        username,
        email,
        password,
      });

      if (response.data.success) {
        setMessage("🎉 สมัครสมาชิกสำเร็จ! กำลังนำคุณไปสู่หน้าล็อกอิน...");
        setTimeout(() => {
          navigate("/login");
          onClose(); // ปิดป๊อปอัปหลังสมัครสำเร็จ
        }, 2000);
      } else {
        setMessage(response.data.message || "❌ การลงทะเบียนล้มเหลว!");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content animate-slideUp">
        {/* ✅ ปุ่มปิด (X) กดได้แล้ว */}
        <button onClick={() => navigate("/home")} className="popup-close">✕</button>

        <h2 className="text-3xl font-extrabold mb-4 text-white">สมัครสมาชิก</h2>

        {message && <p className="text-green-400 text-sm mb-4">{message}</p>}

        <form onSubmit={handleRegister} className="space-y-4">
          <input
            type="text"
            placeholder="ชื่อผู้ใช้"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="popup-input"
            required
          />
          <input
            type="email"
            placeholder="อีเมล"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="popup-input"
            required
          />
          <input
            type="password"
            placeholder="รหัสผ่าน"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="popup-input"
            required
          />

          <button type="submit" className="btn btn-order">สมัครสมาชิก</button>
        </form>

        {/* ✅ ปุ่ม "หากมีบัญชีแล้ว ให้กลับไปหน้าเข้าสู่ระบบ" */}
        <p className="text-sm text-gray-400 mt-4">
          มีบัญชีแล้ว?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate("/login")}>
            เข้าสู่ระบบที่นี่
          </span>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
