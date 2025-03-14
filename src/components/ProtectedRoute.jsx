import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // ถ้าไม่มี token ก็ไม่ต้อง redirect ไปหน้า login
  return token ? children : children;
};

export default ProtectedRoute;
