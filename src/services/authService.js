import { auth, storage } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  updateEmail,
  sendSignInLinkToEmail,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const postLogin = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const data = {
      accessToken: userCredential.user.accessToken,
      refreshToken: userCredential.user.stsTokenManager.refreshToken,
      displayName: userCredential.user.displayName,
      email: userCredential.user.email,
      userId: userCredential.user.uid,
      emailVerified: userCredential.user.emailVerified,
      photoUrl: userCredential.user.photoURL,
    };

    return { data };
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      return "User not found. Please register.";
    } else if (err.code === "auth/wrong-password") {
      return "Password is incorrect";
    }

    return "Something went wrong. Please try again.";
  }
};

export const postGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    const data = {
      accessToken: result.user.accessToken,
      refreshToken: result.user.stsTokenManager.refreshToken,
      displayName: result.user.displayName,
      email: result.user.email,
      userId: result.user.uid,
      emailVerified: result.user.emailVerified,
      photoUrl: result.user.photoURL,
    };

    return { data };
  } catch (err) {
    if (err.code === "auth/account-exists-with-different-credential") {
      return "Account already exists with different credential";
    }

    return "Something went wrong. Please try again.";
  }
};

export const postLogout = async () => {
  try {
    await signOut(auth);
    return { data: "Logout successful" };
  } catch (err) {
    return "Something went wrong. Please try again.";
  }
};

export const postRegister = async (displayName, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName });

    const data = {
      accessToken: user.accessToken,
      refreshToken: user.stsTokenManager.refreshToken,
      displayName: user.displayName,
      email: user.email,
      userId: user.uid,
      emailVerified: user.emailVerified,
      photoUrl: user.photoURL,
    };

    return { data };
  } catch (err) {
    if (err.code === "auth/email-already-in-use") {
      return "Email already in use. Please login.";
    }

    return "Something went wrong. Please try again.";
  }
};

export const postUpdateProfileInfo = async (displayName, email, profilePictureFile) => {
  try {
    const user = auth.currentUser;
    await updateProfile(user, { displayName });
    await updateEmail(user, email);
    const storageRef = ref(storage, `profilePictures/${user.uid}`);
    if (profilePictureFile) {
      const uploadTask = await uploadBytes(storageRef, profilePictureFile);
      const downloadUrl = await getDownloadURL(uploadTask.ref);
      await updateProfile(user, { photoURL: downloadUrl });
    }

    const data = {
      accessToken: user.accessToken,
      refreshToken: user.stsTokenManager.refreshToken,
      displayName: user.displayName,
      email: user.email,
      userId: user.uid,
      emailVerified: user.emailVerified,
      photoUrl: user.photoURL,
    };

    return { data };
  } catch (err) {
    console.log(err);
    return "Something went wrong. Please try again.";
  }
};

export const verifyEmail = async (email) => {
  const actionCodeSettings = {
    url: "http://localhost:8888/profile",
    handleCodeInApp: true,
  };

  try {
    await sendSignInLinkToEmail(auth, email, actionCodeSettings);
    return { data: "Email sent" };
  } catch (err) {
    return "Something went wrong. Please try again.";
  }
};
