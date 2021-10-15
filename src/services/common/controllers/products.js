const product = require("../../../models/product");
const response = require("../../../utils/response");

const get = async (req, res, nex) => {
  const { category } = req.query;

  try {
    const products = await product.find({ category: category });

    res.json(response(200, `fetched ${category}`, products));
  } catch (e) {
    res.json(response(500, "Something went wrong"));
  }
};

module.exports = { get: get };
