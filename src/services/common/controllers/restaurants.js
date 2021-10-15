const restaurant = require("../../../models/restaurant");
const response = require("../../../utils/response");

const get = async (req, res, nex) => {
  try {
    const restaurants = await restaurant.find();

    res.json(
      response(
        200,
        "Fetched all restaurants",
        restaurants.sort(() => Math.random() - 0.5)
      )
    );
  } catch (e) {
    res.json(response(500, "Something went wrong"));
  }
};

module.exports = { get: get };
