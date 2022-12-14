import { FETCH_USER_LOGIN_SUCCESS, USER_LOGOUT, FETCH_USER_UPDATE_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
  account: {
    accessToken: "",
    refreshToken: "",
    displayName: "",
    email: "",
    userId: "",
    emailVerified: false,
    photoUrl: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER_LOGIN_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          accessToken: action?.payload?.accessToken,
          refreshToken: action?.payload?.refreshToken,
          displayName: action?.payload?.displayName,
          email: action?.payload?.email,
          userId: action?.payload?.userId,
          emailVerified: action?.payload?.emailVerified,
          photoUrl: action?.payload?.photoUrl,
        },
        isAuthenticated: true,
      };
    case FETCH_USER_UPDATE_SUCCESS:
      return {
        ...state,
        account: {
          ...state.account,
          accessToken: action?.payload?.accessToken,
          refreshToken: action?.payload?.refreshToken,
          displayName: action?.payload?.displayName,
          email: action?.payload?.email,
          userId: action?.payload?.userId,
          emailVerified: action?.payload?.emailVerified,
          photoUrl: action?.payload?.photoUrl,
        },
        isAuthenticated: true,
      };
    case USER_LOGOUT:
      return {
        ...state,
        account: {
          ...state.account,
          accessToken: "",
          refreshToken: "",
          displayName: "",
          email: "",
          userId: "",
          emailVerified: false,
          photoUrl: "",
        },
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default userReducer;
