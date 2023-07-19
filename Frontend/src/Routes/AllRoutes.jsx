import React from "react";
import { Routes, Route } from "react-router-dom";

import { LoginPage } from "../Pages/LoginPage";
import { OldCarsPage } from "../Pages/OldCarsPage";
import { ProtectedRoutes } from "./ProtectedRoutes";
import { AddCarPage } from "../Pages/AddCarPage";
import { UpdateCar } from "../Components/UpdateCar";
import HomePage from "../Pages/HomePage";

export const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/login" element={<LoginPage />}></Route>
      <Route
        path="/dealer"
        element={
          <ProtectedRoutes>
            <OldCarsPage />
          </ProtectedRoutes>
        }
      ></Route>{" "}
      <Route
        path="/addCar"
        element={
          <ProtectedRoutes>
            <AddCarPage />
          </ProtectedRoutes>
        }
      ></Route>
      <Route
        path="/updateCar/:id"
        element={
          <ProtectedRoutes>
            <UpdateCar />
          </ProtectedRoutes>
        }
      ></Route>
      <Route path="*" element={<h1>404 Page Not Found</h1>}></Route>
    </Routes>
  );
};
