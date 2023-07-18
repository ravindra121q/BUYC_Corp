import axios from "axios";
import {
  AUTH_REQUEST_FAILURE,
  AUTH_REQUEST_PENDING,
  AUTH_REQUEST_SUCCESS,
} from "./actionTypes";

export const getAuth = (obj) => (dispatch) => {
  dispatch({ type: AUTH_REQUEST_PENDING });
  axios
    .post("https://reqres.in/api/login", obj)
    .then((res) => {
      dispatch({ type: AUTH_REQUEST_SUCCESS });
      localStorage.setItem("token", JSON.stringify(res.data.token));
      console.log(res.data.token);
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: AUTH_REQUEST_FAILURE });
    });
};
