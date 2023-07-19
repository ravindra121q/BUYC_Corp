import axios from "axios";
import {
  GET_DATA_FAILURE,
  GET_DATA_REQUEST,
  GET_DATA_SUCCESS,
} from "./actionTypes";

export const getData = () => (dispatch) => {
  try {
    dispatch({ type: GET_DATA_REQUEST });
    axios.get("https://silly-deer-slacks.cyclic.app/oem").then((res) => {
      
      dispatch({ type: GET_DATA_SUCCESS, payload: res.data });
    });
  } catch (error) {
    dispatch({ type: GET_DATA_FAILURE });
  }
};
