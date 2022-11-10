require("dotenv").config();
const axios = require("axios");

exports.handler = async (event, context) => {
  try {
    const response = await axios.get(
      `${process.env.THEMEALDB_URL}/${process.env.THEMEALDB_API_KEY}/categories.php`
    );

    if (response.data.categories && response.data.categories.length > 0) {
      return {
        statusCode: 200,
        body: JSON.stringify(response.data.categories),
      };
    } else {
      return {
        statusCode: 404,
        body: "Cannot find any categories",
      };
    }
  } catch (err) {
    return {
      statusCode: 404,
      body: err.toString(),
    };
  }
};
