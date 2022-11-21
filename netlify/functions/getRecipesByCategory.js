require("dotenv").config();
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const category = event.queryStringParameters.category;

    // Get recipes by category
    const response = await axios.get(`${process.env.THEMEALDB_URL}/${process.env.THEMEALDB_API_KEY}/filter.php?c=${category}`);

    if (response.data.meals && response.data.meals.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(response.data.meals),
      };
    } else {
      throw new Error("No recipes found");
    }
    // // Get the full recipe details by the fetched recipes id
    // if (response.data.meals && response.data.meals.length > 0) {
    //   const recipesPromises = response.data.meals.map(async (recipe) => {
    //     const res = await axios.get(`${process.env.THEMEALDB_URL}/${process.env.THEMEALDB_API_KEY}/lookup.php?i=${recipe.idMeal}`);

    //     if (res.data.meals && res.data.meals.length > 0) {
    //       return res.data.meals[0];
    //     }

    //     return null;
    //   });

    //   const data = await Promise.allSettled(recipesPromises);

    //   if (data && data.length > 0) {
    //     return {
    //       statusCode: 200,
    //       body: JSON.stringify(data),
    //     };
    //   } else {
    //     return {
    //       statusCode: 404,
    //       body: "No recipes found",
    //     };
    //   }
    // } else {
    //   return {
    //     statusCode: 404,
    //     body: "No recipes found for this category",
    //   };
    // }
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
