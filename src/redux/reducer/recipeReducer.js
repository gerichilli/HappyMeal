import { FETCH_SAVED_RECIPES_SUCCESS } from "../action/recipeAction";

const INITIAL_STATE = [];

const recipeReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SAVED_RECIPES_SUCCESS:
      return action.payload;
    default:
      return state;
  }
};

export default recipeReducer;
