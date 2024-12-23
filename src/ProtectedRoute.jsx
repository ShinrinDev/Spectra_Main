// src/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContext/AuthContext";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/auth/sign-in" />;
  }

  if (!allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
