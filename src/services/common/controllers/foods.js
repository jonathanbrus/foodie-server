const food = require("../../../models/food");
const error = require("../../../utils/error");

const get = async (req, res, nex) => {
  const { id } = req.query;

  try {
    const foods = await food.find({ restaurantId: id });

    res.json({
      statusCode: "200",
      message: "Fetched all foods",
      foods: foods,
    });
  } catch (e) {
    res.json(error(500, "Something went wrong"));
  }
};

module.exports = { get: get };
