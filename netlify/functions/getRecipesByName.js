require("dotenv").config();
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const name = event.queryStringParameters.name;

    const response = await axios.get(
      `${process.env.THEMEALDB_URL}/${process.env.THEMEALDB_API_KEY}/search.php?s=${name}`
    );

    if (response.data.meals && response.data.meals.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(response.data.meals),
      };
    } else {
      throw new Error("No recipes found");
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
