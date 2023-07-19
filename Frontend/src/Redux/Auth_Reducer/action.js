import axios from "axios";
import {
  AUTH_REQUEST_FAILURE,
  AUTH_REQUEST_PENDING,
  AUTH_REQUEST_SUCCESS,
} from "./actionTypes";
import { getData } from "../Data_Reducer/action";

export const getAuth = (obj) => (dispatch) => {
  dispatch({ type: AUTH_REQUEST_PENDING });
  console.log(obj);
  return axios
    .post("https://silly-deer-slacks.cyclic.app/login", obj)
    .then((res) => {
      dispatch({ type: AUTH_REQUEST_SUCCESS });
      if (!res.data.token) {
        return alert(res.data.msg);
      }
      localStorage.setItem("token", JSON.stringify(res.data.token));
      alert(res.data.msg);
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: AUTH_REQUEST_FAILURE });
    });
};

export const createUser = (obj) => (dispatch) => {
  axios.post("https://silly-deer-slacks.cyclic.app/signUp", obj).then((res) => {
    alert(res.data.msg);
  });
};

export const addNewCar = (obj) => (dispatch) => {
  console.log(obj);
  const token = localStorage.getItem("token");
  const newToken = token.replace(/"/g, "").trim();

  console.log(newToken);

  axios
    .post("http://localhost:8080/dealer/car", obj, {
      headers: { Authorization: `Bearer ${newToken}` },
    })
    .then((res) => console.log(res))
    .catch((error) => console.log(error));
};



export const updateCarHandler =
  ({ formData, id }) =>
  (dispatch) => {
    const token = localStorage.getItem("token");
    const newToken = token.replace(/"/g, "").trim();
    axios
      .put(
        `https://silly-deer-slacks.cyclic.app/dealer/car/${id.id}`,
        formData,
        {
          headers: { Authorization: `Bearer ${newToken}` },
        }
      )
      .then((res) => alert(res.data.message))
      .catch((error) => console.log(error));
  };
