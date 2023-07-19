import { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const isAuth = true;
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      navigate("/login", { state: location.pathname });
    }
  }, [navigate, token, location.pathname]);

  return isAuth ? children : <Navigate to="/login" state={location.pathname} />;
};
