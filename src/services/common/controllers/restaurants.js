const restaurant = require("../../../models/restaurant");
const error = require("../../../utils/error");

const allRestaurants = async (req, res, nex) => {
  try {
    const restaurants = await restaurant.find();

    res.json({
      statusCode: "200",
      message: "Fetched all restaurants",
      restaurants: restaurants.sort(() => Math.random() - 0.5),
    });
  } catch (e) {
    res.json(error(500, "Something went wrong"));
  }
};

module.exports = allRestaurants;
