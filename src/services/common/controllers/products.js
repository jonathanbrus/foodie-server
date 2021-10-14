const product = require("../../../models/products");
const error = require("../../../utils/error");

const get = async (req, res, nex) => {
  const { category } = req.query;

  try {
    const products = await product.find({ category: category });

    res.json({
      statusCode: "200",
      message: `fetched ${category}`,
      products: products,
    });
  } catch (e) {
    res.json(error(500, "Something went wrong"));
  }
};

module.exports = { get: get };
