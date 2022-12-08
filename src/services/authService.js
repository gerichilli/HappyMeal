import { auth, storage } from "../firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  updateProfile,
  updateEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { BASE_URL } from "../utils/constants";

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
    if (err.code === "auth/email-already-in-use") {
      return "Email already in use. Please try another email.";
    }
    return "Something went wrong. Please try again.";
  }
};

export const verifyEmail = async () => {
  const user = auth.currentUser;

  const actionCodeSettings = {
    url: `${BASE_URL}/profile`,
    handleCodeInApp: true,
  };

  try {
    await sendEmailVerification(user, actionCodeSettings);

    return { data: "Sent email verication request. Please check your email." };
  } catch (err) {
    return "Something went wrong. Please try again.";
  }
};

export const postResetPassword = async (email) => {
  const actionCodeSettings = {
    url: `${BASE_URL}/login?mode=resetPassword`,
    handleCodeInApp: true,
  };

  try {
    await sendPasswordResetEmail(auth, email, actionCodeSettings);
    return { data: "Sent password reset request. Please check your email." };
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      return "User not found. Please register.";
    }
    return "Something went wrong. Please try again.";
  }
};

export const deleteAccount = async () => {
  try {
    const user = auth.currentUser;
    await deleteUser(user);
    return { data: "Account deleted successfully" };
  } catch (err) {
    return "Something went wrong. Please try again.";
  }
};
