import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
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
      <div>Buy Cars</div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "2em",
        }}
      >
        <Link to={"/"}>Home</Link>
        <Link>Old Cars</Link>
        <Link>Dealer Page</Link>
        <Link>Add Cars</Link>
        {/* <Link to={"/login"}>Login Page</Link> */}
      </div>
      <div>
        <button>Login</button>
      </div>
    </div>
  );
};
