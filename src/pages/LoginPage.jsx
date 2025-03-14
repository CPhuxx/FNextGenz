import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const LoginPage = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // ✅ ฟังก์ชันกดเข้าสู่ระบบ
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.data.success) {
        setMessage("✅ เข้าสู่ระบบสำเร็จ! กำลังนำคุณไป...");
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setTimeout(() => {
          navigate("/home");
          onClose(); // ปิดป๊อปอัปหลังเข้าสู่ระบบสำเร็จ
        }, 2000);
      } else {
        setMessage(response.data.message || "❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง!");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content animate-slideUp">
        {/* ✅ ปุ่มปิด (X) กดแล้วกลับไปหน้าแรก */}
        <button onClick={() => navigate("/home")} className="popup-close">✕</button>

        <h2 className="text-3xl font-extrabold mb-4 text-white">เข้าสู่ระบบ</h2>

        {message && <p className="text-green-400 text-sm mb-4">{message}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
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

          <button type="submit" className="btn btn-buy">เข้าสู่ระบบ</button>
        </form>

        {/* ✅ ปุ่ม "ยังไม่มีบัญชี? สมัครสมาชิก" */}
        <p className="text-sm text-gray-400 mt-4">
          ยังไม่มีบัญชี?{" "}
          <span className="text-blue-400 cursor-pointer hover:underline" onClick={() => navigate("/register")}>
            สมัครสมาชิกที่นี่
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
