import {
  DELETE_DELEAR_DATA,
  GET_DEALER_DATA_FAILURE,
  GET_DEALER_DATA_REQUEST,
  GET_DEALER_DATA_SUCCESS,
} from "./actionTypes";

const initialState = { isLoading: false, isError: false, data: [] };

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_DEALER_DATA_REQUEST:
      return { ...state, isLoading: true, isError: false };
    case GET_DEALER_DATA_SUCCESS:
      return { ...state, isLoading: false, isError: false, data: payload };
    case GET_DEALER_DATA_FAILURE:
      return { ...state, isLoading: false, isError: true };
    case DELETE_DELEAR_DATA:
      const filteredData = state.data.filter((car) => car._id !== payload);
      return { ...state, isLoading: false, isError: false, data: filteredData };

    default:
      return state;
  }
};
