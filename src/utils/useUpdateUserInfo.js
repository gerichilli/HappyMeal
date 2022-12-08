import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { doLogout, doUserUpdate } from "../redux/action/userAction";

function useUpdateUserInfo() {
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          doUserUpdate({
            accessToken: user.accessToken,
            refreshToken: user.stsTokenManager.refreshToken,
            displayName: user.displayName,
            email: user.email,
            userId: user.uid,
            emailVerified: user.emailVerified,
            photoUrl: user.photoURL,
          })
        );
      } else {
        dispatch(doLogout());
      }
    });
  }, []);
}

export default useUpdateUserInfo;
