require("dotenv").config();
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const response = await axios.get(
      `${process.env.THEMEALDB_URL}/${process.env.THEMEALDB_API_KEY}/list.php?c=list`
    );

    if (response.data.meals && response.data.meals.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(response.data.meals),
      };
    } else {
      return {
        statusCode: 404,
        body: "This category does not exist in the database",
      };
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
