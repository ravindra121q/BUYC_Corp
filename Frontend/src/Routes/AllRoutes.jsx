import React from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage } from "../Pages/HomePage";
import { LoginPage } from "../Pages/LoginPage";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route path="*" element={<h1>404 Page Not Found</h1>}></Route>
    </Routes>
  );
};
