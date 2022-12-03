export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
export const FETCH_USER_UPDATE_SUCCESS = "FETCH_USER_UPDATE_SUCCESS";
export const USER_LOGOUT = "USER_LOGOUT";

export const doLogin = (user) => {
  return {
    type: FETCH_USER_LOGIN_SUCCESS,
    payload: user,
  };
};

export const doLogout = () => {
  return {
    type: USER_LOGOUT,
  };
};

export const doUserUpdate = (user) => {
  return {
    type: FETCH_USER_UPDATE_SUCCESS,
    payload: user,
  };
};
