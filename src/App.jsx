import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import GameTopupPage from "./pages/GameTopupPage";
import ItemTopupPage from "./pages/ItemTopupPage";
import PremiumAppsPage from "./pages/PremiumAppsPage";
import OrderHistoryPage from "./pages/OrderHistoryPage"; // เพิ่มหน้า OrderHistoryPage
import ProtectedRoute from "./components/ProtectedRoute"; // To protect routes that require login or admin access
import Topup02 from "./pages/Topup02";
import ContactPage from "./pages/ContactPage";
import AdminDashboard from "./pages/AdminDashboard"; // Admin Dashboard page
import AdminSettings from "./pages/AdminSettings"; // New Page for Admin Settings
import AdminManageData from "./pages/AdminManageData"; // New Page for Admin Manage Data
import AdminAddProductPage from "./pages/AdminAddProductPage"; // Import the new Admin Add Product Page

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Redirect to home page if accessing the root */}
        <Route path="/" element={<Navigate to="/home" />} />
        
        {/* ✅ Main Routes */}
        <Route path="/home" element={<HomePage />} />
        
        {/* ✅ Login & Register Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        {/* ✅ Protected Routes (requires login) */}
        <Route path="/topup" element={<ProtectedRoute><GameTopupPage /></ProtectedRoute>} />
        <Route path="/topup02" element={<ProtectedRoute><Topup02 /></ProtectedRoute>} />
        <Route path="/item-topup" element={<ProtectedRoute><ItemTopupPage /></ProtectedRoute>} />
        <Route path="/premium-apps" element={<ProtectedRoute><PremiumAppsPage /></ProtectedRoute>} />
        
        {/* ✅ Admin Routes (requires admin access) */}
        <Route path="/admin/dashboard" element={<ProtectedRoute adminOnly={true}><AdminDashboard /></ProtectedRoute>} />
        
        {/* ✅ Admin Settings */}
        <Route path="/admin/settings" element={<ProtectedRoute adminOnly={true}><AdminSettings /></ProtectedRoute>} />
        
        {/* ✅ Admin Manage Data */}
        <Route path="/admin/manage-data" element={<ProtectedRoute adminOnly={true}><AdminManageData /></ProtectedRoute>} />
        
        {/* ✅ Admin Add Product */}
        <Route path="/admin/add-product" element={<ProtectedRoute adminOnly={true}><AdminAddProductPage /></ProtectedRoute>} />

        {/* ✅ Order History */}
        <Route path="/order-history" element={<ProtectedRoute><OrderHistoryPage /></ProtectedRoute>} /> {/* เพิ่มเส้นทางสำหรับหน้าประวัติการสั่งซื้อ */}
        
        {/* ✅ Contact Page */}
        <Route path="/contact" element={<ContactPage />} />
        
        {/* ✅ Catch-all route (if no route matches) */}
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </Router>
  );
}

export default App;
