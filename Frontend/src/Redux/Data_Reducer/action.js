import axios from "axios";
import {
  GET_DATA_FAILURE,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
} from "./actionTypes";

export const getData = () => (dispatch) => {
  try {
    dispatch({ type: GET_DATA_REQUEST });
    axios.get("http://localhost:8080/oem").then((res) => {
      console.log(res.data);
      dispatch({ type: GET_DATA_SUCCESS, payload: res.data });
    });
  } catch (error) {
    dispatch({ type: GET_DATA_FAILURE });
  }
};
