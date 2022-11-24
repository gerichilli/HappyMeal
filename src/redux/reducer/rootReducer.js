import { combineReducers } from "redux";
import historyReducer from "./historyReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  history: historyReducer,
  user: userReducer,
});

export default rootReducer;
