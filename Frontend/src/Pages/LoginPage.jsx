import React, { useState } from "react";
import "../CSS/loginpage.css";
import { useDispatch } from "react-redux";
import { createUser, getAuth } from "../Redux/Auth_Reducer/action";
import { Alert, AlertIcon, AlertTitle } from "@chakra-ui/react";

import { useLocation, useNavigate } from "react-router-dom";
export const LoginPage = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [alert, setAlert] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const submitHandler = (e) => {
    if (email === "" || password === "") {
      return setAlert(true);
    }
    setAlert(false);
    e.preventDefault();

    if (isLogin) {
      const obj = { email, password };
      dispatch(getAuth(obj)).then(() => {
        if (location.state === null) {
          navigate("/");
        } else {
          navigate(location.state);
        }
      });
    } else {
      if (!name) {
        return setAlert(true);
      }
      setAlert(false);
      const obj = { name, email, password };
      dispatch(createUser(obj));
      setTimeout(() => {
        setIsLogin(true);
      }, 1000);
    }
  };
  return (
    <div>
      <h3
        style={{ width: "30%", margin: "auto", alignItems: "center" }}
        size={2}
      >
        {alert && (
          <Alert status="error">
            <AlertIcon boxSize={25} mt={10} />
            <AlertTitle>Please Fill All The Details!</AlertTitle>
          </Alert>
        )}
      </h3>{" "}
      <div
        style={{ display: "grid", placeItems: "center", marginBottom: "1rem" }}
      >
        <form className="form" onSubmit={submitHandler}>
          {!isLogin ? <p id="heading">SignUp</p> : <p id="heading">Login</p>}
          {!isLogin && (
            <div className="field">
              <svg
                className="input-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
              </svg>
              <input
                autoComplete="off"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input-field"
                type="text"
              />
            </div>
          )}
          <div className="field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M13.106 7.222c0-2.967-2.249-5.032-5.482-5.032-3.35 0-5.646 2.318-5.646 5.702 0 3.493 2.235 5.708 5.762 5.708.862 0 1.689-.123 2.304-.335v-.862c-.43.199-1.354.328-2.29.328-2.926 0-4.813-1.88-4.813-4.798 0-2.844 1.921-4.881 4.594-4.881 2.735 0 4.608 1.688 4.608 4.156 0 1.682-.554 2.769-1.416 2.769-.492 0-.772-.28-.772-.76V5.206H8.923v.834h-.11c-.266-.595-.881-.964-1.6-.964-1.4 0-2.378 1.162-2.378 2.823 0 1.737.957 2.906 2.379 2.906.8 0 1.415-.39 1.709-1.087h.11c.081.67.703 1.148 1.503 1.148 1.572 0 2.57-1.415 2.57-3.643zm-7.177.704c0-1.197.54-1.907 1.456-1.907.93 0 1.524.738 1.524 1.907S8.308 9.84 7.371 9.84c-.895 0-1.442-.725-1.442-1.914z"></path>
            </svg>
            <input
              autoComplete="off"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-field"
              type="text"
            />
          </div>
          <div className="field">
            <svg
              className="input-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z"></path>
            </svg>
            <input
              placeholder="Password"
              className="input-field"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btn">
            {isLogin ? (
              <button className="button1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Login&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            ) : (
              <button className="button1">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;SignUp&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </button>
            )}
          </div>
          {isLogin ? (
            <h5 style={{ color: "white" }}>
              Not a member ?{" "}
              <span
                onClick={() => setIsLogin(false)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                {" "}
                SignUp
              </span>
            </h5>
          ) : (
            <h5 style={{ color: "white" }}>
              Already a member ?{" "}
              <span
                onClick={() => setIsLogin(true)}
                style={{ color: "blue", cursor: "pointer" }}
              >
                {" "}
                Log In
              </span>
            </h5>
          )}

          {/* <button className="button2">Sign Up</button> */}
        </form>
      </div>
    </div>
  );
};
