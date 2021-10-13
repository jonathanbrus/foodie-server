const products = require("../../../models/products");

const create = async (req, res, nex) => {
  const { category, config } = req.body;

  try {
    const created = await products.create({
      name: config.name.trim(),
      image: config.image,
      description: config.description.trim(),
      productDetail: config.productDetail,
      category: category.trim(),
      subCategory: config.category.trim(),
      fixedPrice: Number(config.fixedPrice),
      offerPrice: Number(config.offerPrice),
      itemsInStock: Number(config.itemsInStock),
      bestSeller: config.bestSeller,
      rating: [],
    });

    res.json({
      message: `Successfully added product to ${category}`,
      created: created,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
};

const updateOne = async (req, res, nex) => {
  const { category, config } = req.body;

  try {
    const fetched = await products.findOne({
      _id: config.id,
      category: category,
    });

    fetched.name = config.name || fetched.name.trim();
    fetched.image = config.image || fetched.image;
    fetched.description = config.description || fetched.description.trim();
    fetched.productDetail = config.productDetail || fetched.productDetail;
    fetched.category = category || category.trim();
    fetched.subCategory = config.category || fetched.category.trim();
    fetched.fixedPrice = config.fixedPrice || fetched.fixedPrice;
    fetched.offerPrice = config.offerPrice || fetched.offerPrice;
    fetched.itemsInStock = config.itemsInStock || fetched.itemsInStock;
    fetched.bestSeller = config.bestSeller || fetched.bestSeller;

    const updated = await fetched.save();
    res.json({
      message: `Successfully added product to ${category}`,
      updated: updated,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteOne = async (req, res, nex) => {
  const { id } = req.query;
  try {
    await products.deleteOne({ _id: id });

    res.json({
      message: "Successfully deleted product",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  create: create,
  updateOne: updateOne,
  deleteOne: deleteOne,
};
