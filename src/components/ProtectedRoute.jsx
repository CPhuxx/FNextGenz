import { Navigate } from "react-router-dom";

// Protected Route for admin
const ProtectedRoute = ({ children, adminOnly }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // If no user logged in or adminOnly is true and user isn't admin, redirect to home
  if (!user || (adminOnly && user.role !== "admin")) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
