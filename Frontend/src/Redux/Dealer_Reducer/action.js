import axios from "axios";
import {
  DELETE_DELEAR_DATA,
  GET_DEALER_DATA_FAILURE,
  GET_DEALER_DATA_REQUEST,
  GET_DEALER_DATA_SUCCESS,
} from "./actionTypes";

export const getDealerData =
  (selectedPriceRange, selectedColor, selectedMileage) => (dispatch) => {
    try {
      dispatch({ type: GET_DEALER_DATA_REQUEST });
      const token = localStorage.getItem("token");
      const newToken = token.replace(/"/g, "");
      console.log(newToken);

      let queryParams = `?selectedPriceRange=${selectedPriceRange}&selectedColor=${selectedColor}&selectedMileage=${selectedMileage}`;

      axios
        .get(
          `https://silly-deer-slacks.cyclic.app/dealer/getCar/${queryParams}`,
          {
            headers: { Authorization: `Bearer ${newToken}` },
          }
        )
        .then((res) => {
          console.log("working");
          console.log(res.data.user);
          dispatch({ type: GET_DEALER_DATA_SUCCESS, payload: res.data.user });
        })
        .catch((error) => {
          dispatch({ type: GET_DEALER_DATA_FAILURE });
        });
    } catch (error) {
      dispatch({ type: GET_DEALER_DATA_FAILURE });
    }
  };

export const deleteCard = (id) => (dispatch) => {
  
  const token = localStorage.getItem("token");
  const newToken = token.replace(/"/g, "").trim();

  axios
    .delete(`https://silly-deer-slacks.cyclic.app/dealer/car/${id}`, {
      headers: { Authorization: `Bearer ${newToken}` },
    })
    .then((res) => dispatch({ type: DELETE_DELEAR_DATA, payload: id }))
    .catch((error) => console.log(error));
};
