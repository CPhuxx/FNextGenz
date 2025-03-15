import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, adminOnly = false }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  if (!token) {
    // ถ้าไม่มี token ให้ไปที่หน้า login
    return <Navigate to="/login" />;
  }

  if (adminOnly && (!user || user.role !== "admin")) {
    // ถ้า user ไม่มี role หรือไม่ใช่ admin ให้ไปหน้า home
    return <Navigate to="/home" />;
  }

  // ถ้าผ่านการเช็คทั้งหมดแล้ว ให้ render children
  return children;
};

export default ProtectedRoute;
