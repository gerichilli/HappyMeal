export const FETCH_USER_LOGIN_SUCCESS = "FETCH_USER_LOGIN_SUCCESS";
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
