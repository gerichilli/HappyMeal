import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT } from "../action/userAction";

const INITIAL_STATE = {
  account: {
    accessToken: "",
    refreshToken: "",
    displayName: "",
    email: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          accessToken: action?.payload?.accessToken,
          refreshToken: action?.payload?.refreshToken,
          displayName: action?.payload?.displayName,
          email: action?.payload?.email,
        },
        isAuthenticated: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        account: {
          accessToken: "",
          refreshToken: "",
          displayName: "",
          email: "",
        },
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
