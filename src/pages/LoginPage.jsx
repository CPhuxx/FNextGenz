import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const LoginPage = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", { email, password });

      // Check if login was successful and we received a token
      if (response.data.token) {
        setMessage("✅ เข้าสู่ระบบสำเร็จ! กำลังนำคุณไป...");
        
        // Store user data and token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        // Redirect to admin dashboard if the user is an admin, else to the home page
        setTimeout(() => {
          navigate(response.data.user.role === "admin" ? "/admin/dashboard" : "/home");
          onClose(); // Close the login popup after successful login
        }, 2000);
      } else {
        setMessage("❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง!");
      }
    } catch (error) {
      // Handle errors from the API, such as invalid credentials or server issues
      setMessage(error.response?.data?.message || "❌ เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content animate-slideUp">
        {/* Close the popup and navigate to the home page */}
        <button onClick={() => navigate("/home")} className="popup-close">✕</button>

        <h2 className="text-3xl font-extrabold mb-4 text-white">เข้าสู่ระบบ</h2>

        {message && <p className="text-green-400 text-sm mb-4">{message}</p>}

        {/* Login form */}
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

        {/* Sign up link for users without an account */}
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
