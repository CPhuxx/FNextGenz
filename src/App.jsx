import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import GameTopupPage from "./pages/GameTopupPage";
import ItemTopupPage from "./pages/ItemTopupPage";
import PremiumAppsPage from "./pages/PremiumAppsPage";
import ProtectedRoute from "./components/ProtectedRoute";
import Topup02 from "./pages/Topup02";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/AdminDashboard"; // Import Admin Dashboard

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ เส้นทางหลัก */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<HomePage />} />
        
        {/* ✅ เส้นทางล็อกอิน & สมัครสมาชิก */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* ✅ เส้นทางที่ต้องใช้การล็อกอิน */}
        <Route path="/topup" element={<ProtectedRoute><GameTopupPage /></ProtectedRoute>} />
        <Route path="/topup02" element={<ProtectedRoute><Topup02 /></ProtectedRoute>} />
        <Route path="/item-topup" element={<ProtectedRoute><ItemTopupPage /></ProtectedRoute>} />
        <Route path="/premium-apps" element={<ProtectedRoute><PremiumAppsPage /></ProtectedRoute>} />
        
        {/* ✅ Admin Dashboard (Only accessible to admin users) */}
        <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
        
        {/* ✅ เส้นทางติดต่อเรา */}
        <Route path="/contact" element={<ContactPage />} />
        
        {/* ✅ เส้นทางสำหรับกรณีที่ไม่มีหน้า */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
