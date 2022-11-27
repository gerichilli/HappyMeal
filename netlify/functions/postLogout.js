const { auth } = require("./firebase");
const { signOut } = require("firebase/auth");

exports.handler = async (event, context) => {
  try {
    await signOut(auth);
    return {
      statusCode: 200,
      body: "Logout successful",
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: "Something went wrong. Please try again.",
    };
  }
};
