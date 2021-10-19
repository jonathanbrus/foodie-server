const products = require("../../../models/product");

const response = require("../../../utils/response");

const create = async (req, res, nex) => {
  const { category, config } = req.body;

  try {
    const created = await products.create({
      name: config.name.trim(),
      image: config.image,
      description: config.description.trim(),
      productDetail: config.productDetail,
      category: category.trim(),
      subCategory: config.subCategory.trim(),
      fixedPrice: Number(config.fixedPrice.trim()),
      offerPrice: Number(config.offerPrice.trim()),
      itemsInStock: Number(config.itemsInStock.trim()),
      bestSeller: config.bestSeller,
    });

    res.json(
      response(200, `Successfully added product to ${category}`, created)
    );
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

const updateOne = async (req, res, nex) => {
  const { category, config } = req.body;

  try {
    const fetched = await products.findOne({
      _id: config.id,
      category: category,
    });

    fetched.name = config.name.trim() || fetched.name;
    fetched.image = config.image || fetched.image;
    fetched.description = config.description.trim() || fetched.description;
    fetched.productDetail = config.productDetail || fetched.productDetail;
    fetched.category = category.trim() || fetched.category;
    fetched.subCategory = config.subCategory.trim() || fetched.subCategory;
    fetched.fixedPrice = Number(config.fixedPrice.trim());
    fetched.offerPrice = Number(config.offerPrice.trim());
    fetched.itemsInStock = Number(config.itemsInStock.trim());
    fetched.bestSeller = config.bestSeller || fetched.bestSeller;

    const updated = await fetched.save();
    res.json(response(200, `Successfully updated the product`, updated));
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

const deleteOne = async (req, res, nex) => {
  const { id } = req.query;
  try {
    await products.deleteOne({ _id: id });

    res.json(response(200, "Successfully deleted product"));
  } catch (e) {
    res.json(response(500, "Something went wrong, try again later"));
  }
};

module.exports = {
  create: create,
  updateOne: updateOne,
  deleteOne: deleteOne,
};
