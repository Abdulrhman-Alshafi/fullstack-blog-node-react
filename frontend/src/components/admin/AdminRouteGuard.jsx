import { Navigate } from "react-router-dom";

export default function AdminRouteGuard({ children }) {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");

  if (!userInfo || !userInfo.isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
