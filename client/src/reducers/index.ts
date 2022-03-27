import { combineReducers } from "redux";
import user from "./userReducer";
import board from "./boardReducer";

const rootReducer = combineReducers({ user, board });

export default rootReducer;
