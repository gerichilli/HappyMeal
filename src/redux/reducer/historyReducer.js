import { PUSH_LOCATION_TO_HISTORY } from "../action/historyAction";
import { POP_LOCATION_FROM_HISTORY } from "../action/historyAction";

const initialState = ["/"];

const historyReducer = (state = initialState, action) => {
  switch (action.type) {
    case PUSH_LOCATION_TO_HISTORY:
      return [...state, action.payload];
    case POP_LOCATION_FROM_HISTORY:
      if (state.length > 1) {
        return state.slice(0, state.length - 1);
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default historyReducer;
