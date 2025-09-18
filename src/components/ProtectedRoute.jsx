// components/ProtectedRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("token"); // or useContext / Redux store

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />; // renders child routes
};

export default ProtectedRoute;
