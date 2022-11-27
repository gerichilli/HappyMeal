const { doc, getDoc } = require("firebase/firestore");
const { db } = require("./firebase");

exports.handler = async (event, context) => {
  try {
    const { userId } = JSON.parse(event.body);
    const userRef = doc(db, "users", userId);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      const data = userSnap.data();

      return {
        statusCode: 200,
        body: JSON.stringify(data.savedRecipes),
      };
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify([]),
      };
    }
  } catch (err) {
    console.log(err);
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
