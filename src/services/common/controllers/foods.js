const food = require("../../../models/food");
const response = require("../../../utils/response");

const get = async (req, res, nex) => {
  const { id } = req.query;

  try {
    const foods = await food.find({ restaurantId: id });

    res.json(response(200, "Fetched all foods", foods));
  } catch (e) {
    res.json(response(500, "Something went wrong"));
  }
};

module.exports = { get: get };
