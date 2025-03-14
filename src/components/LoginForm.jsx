import { useState } from "react";

const LoginForm = ({ onLogin, switchToRegister }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      await onLogin(formData);
      setMessage("ล็อกอินสำเร็จ!");
    } catch (err) {
      setMessage(err.message || "การล็อกอินล้มเหลว!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-xl w-96 text-white">
        <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
        {message && <p className="text-center text-red-400">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-lg font-bold transition"
          >
            Login
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-gray-400">
            ยังไม่มีบัญชีหรือ?{" "}
            <button onClick={switchToRegister} className="text-blue-400 hover:underline">
              ลงทะเบียน
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;