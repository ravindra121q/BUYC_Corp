import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProtectedRoutes = ({ children }) => {
  const isAuth = true;
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      return navigate("/login");
    }
  });
  return <div>ProtectedRoutes</div>;
};
