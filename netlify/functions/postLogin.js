const { auth } = require("./firebase");
const { signInWithEmailAndPassword } = require("firebase/auth");

exports.handler = async (event, context) => {
  try {
    const { email, password } = JSON.parse(event.body);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);

    const data = {
      accessToken: userCredential.user.accessToken,
      refreshToken: userCredential.user.stsTokenManager.refreshToken,
      displayName: userCredential.user.displayName,
      email: userCredential.user.email,
      userId: userCredential.user.uid,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    if (err.code === "auth/user-not-found") {
      return {
        statusCode: 400,
        body: "User not found. Please register.",
      };
    } else if (err.code === "auth/wrong-password") {
      return {
        statusCode: 403,
        body: "Password is incorrect",
      };
    }

    return {
      statusCode: 404,
      body: "Something went wrong. Please try again.",
    };
  }
};
