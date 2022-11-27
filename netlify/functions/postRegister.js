const { auth } = require("./firebase");
const { createUserWithEmailAndPassword, updateProfile } = require("firebase/auth");

exports.handler = async (event, context) => {
  try {
    const { displayName, email, password } = JSON.parse(event.body);
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await updateProfile(user, { displayName });

    const data = {
      accessToken: user.accessToken,
      refreshToken: user.stsTokenManager.refreshToken,
      displayName: user.displayName,
      email: user.email,
      userId: user.uid,
    };

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    console.log(err);

    if (err.code === "auth/email-already-in-use") {
      return {
        statusCode: 403,
        body: "Email already in use. Please login.",
      };
    }

    return {
      statusCode: 404,
      body: "Something went wrong. Please try again.",
    };
  }
};
