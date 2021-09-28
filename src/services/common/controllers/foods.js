const food = require("../../../models/food");
const error = require("../../../utils/error");

const allFoodsByRes = async (req, res, nex) => {
  const { resId } = req.query;

  try {
    const foods = await food.find({ restaurantId: resId });

    res.json({
      statusCode: "200",
      message: "Fetched all foods",
      foods: foods,
    });
  } catch (e) {
    res.json(error(500, "Something went wrong"));
  }
};

module.exports = allFoodsByRes;
