import { AUTH_REQUEST_PENDING, AUTH_REQUEST_SUCCESS } from "./actionTypes";

const initialState = { isLoading: false, isAuth: false, isError: false };

export const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case AUTH_REQUEST_PENDING:
      return { ...state, isLoading: true, isError: false };
    case AUTH_REQUEST_SUCCESS:
      return { ...state, isLoading: false, isError: false, isAuth: true };
    default:
      return state;
  }
};
