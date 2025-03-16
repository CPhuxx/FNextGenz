import { Navigate } from "react-router-dom";

// เส้นทางที่ต้องการการล็อกอิน (Admin)
const ProtectedRoute = ({ children, adminOnly }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // ถ้าไม่มีผู้ใช้ล็อกอิน หรือ adminOnly เป็น true แต่ผู้ใช้ไม่ใช่ admin ให้เปลี่ยนเส้นทางไปหน้าแรก
  if (!user && adminOnly) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
