import React from "react";
import { Link, useNavigate } from "react-router-dom";

export const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
    return;
  };
  return (
    <div
      style={{
        width: "80%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "auto",
        borderBottom: "1px solid black",
        height: "3em",
        textAlign: "center",

        alignItems: "center",
      }}
    >
      <div>
        <img
          style={{ height: "20px", width: "120px" }}
          src={"https://i.ibb.co/RS96XpL/logo.jpg"}
          alt="logo"
        />
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2em",
        }}
      >
        <Link to={"/"}>Home</Link>

        <Link to={"/dealer"}>Dealer Page</Link>
        <Link to={"/addCar"}>Add Cars</Link>
      </div>
      <div>
        {!token ? (
          <Link to={"/login"}>
            <button>Login</button>{" "}
          </Link>
        ) : (
          <button onClick={logoutHandler}>Logout</button>
        )}
      </div>
    </div>
  );
};
