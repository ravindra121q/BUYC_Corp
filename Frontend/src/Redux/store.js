import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { reducer as AuthReducer } from "./Auth_Reducer/reducer.js";
import { reducer as DataReducer } from "./Data_Reducer/reducer.js";
import thunk from "redux-thunk";
const Root_Reducer = combineReducers({ AuthReducer, DataReducer });
export const store = legacy_createStore(Root_Reducer, applyMiddleware(thunk));
