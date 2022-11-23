const { auth } = require("./auth");
const { signInWithEmailAndPassword } = require("firebase/auth");

exports.handler = async (event, context) => {
  try {
    const { email, password } = JSON.parse(event.body);
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
    return {
      statusCode: 200,
      body: JSON.stringify(userCredential.user),
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
