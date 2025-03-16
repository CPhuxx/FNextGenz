import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../index.css";

const LoginPage = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const [timer, setTimer] = useState(null); // Track inactivity timeout

  // Handle login form submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", { email, password });

      if (response.data.token) {
        setMessage("✅ เข้าสู่ระบบสำเร็จ! กำลังนำคุณไป...");
        
        // Store user data and token in localStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        localStorage.setItem("token", response.data.token);

        setTimeout(() => {
          navigate(response.data.user.role === "admin" ? "/admin/dashboard" : "/home");
          onClose(); // Close login popup
        }, 2000);
      } else {
        setMessage("❌ อีเมลหรือรหัสผ่านไม่ถูกต้อง!");
      }
    } catch (error) {
      setMessage(error.response?.data?.message || "❌ เกิดข้อผิดพลาด กรุณาลองอีกครั้ง");
    }
  };

  // Reset inactivity timer
  const resetTimer = () => {
    clearTimeout(timer);
    setTimer(setTimeout(logout, 240000)); // Set to 4 minutes (240,000 ms)
  };

  // Logout after inactivity
  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
    window.location.reload(); // Refresh the page after logout
    clearTimeout(timer);
  };

  useEffect(() => {
    // Set the initial timer when the component mounts
    setTimer(setTimeout(logout, 240000)); // 4 minutes for inactivity

    // Add event listeners for activity tracking
    document.addEventListener("mousemove", resetTimer);
    document.addEventListener("keypress", resetTimer);

    // Cleanup event listeners when component unmounts
    return () => {
      document.removeEventListener("mousemove", resetTimer);
      document.removeEventListener("keypress", resetTimer);
      clearTimeout(timer);
    };
  }, []); // Empty dependency array to ensure it runs once

  return (
    <div className="popup-overlay">
      <div className="popup-content animate-slideUp">
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
