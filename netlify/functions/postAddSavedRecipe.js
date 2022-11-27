const { doc, getDoc, setDoc, updateDoc, arrayUnion, Timestamp } = require("firebase/firestore");
const { db } = require("./firebase");

exports.handler = async (event, context) => {
  try {
    const { recipe, userId } = JSON.parse(event.body);
    const recipeData = {
      ...recipe,
      savedAt: Timestamp.fromDate(new Date()),
    };

    const userRef = doc(db, "users", userId);

    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      // If the user data already exists, add the recipeId to it
      await updateDoc(userRef, {
        savedRecipes: arrayUnion(recipeData),
      });
    } else {
      // If the user data doesn't exist, create it
      await setDoc(userRef, {
        savedRecipes: [recipeData],
      });
    }

    return {
      statusCode: 200,
      body: "Recipe saved.",
    };
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
