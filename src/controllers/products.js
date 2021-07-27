const otherProducts = require("../models/products");

const getAllProductsByCategory = async (req, res, nex) => {
  const { category } = req.query;
  const products = await otherProducts.find({ category: category });

  res.json({
    message: `fetched ${category}`,
    products: products,
  });
};

const addNewProduct = async (req, res, nex) => {
  const { category, prodInfo } = req.body;
  console.log(prodInfo);
  try {
    const addedProduct = await otherProducts.create({
      name: prodInfo.name,
      image: prodInfo.image,
      description: prodInfo.description,
      productDetail: prodInfo.productDetail,
      category: category,
      subCategory: prodInfo.category,
      fixedPrice: prodInfo.fixedPrice,
      offerPrice: prodInfo.offerPrice,
      deliveryCharge: prodInfo.deliveryCharge,
      itemsInStock: prodInfo.itemsInStock,
      rating: 4.2,
    });
    res.json({
      message: `Successfully added product to ${category}`,
      addedProduct: addedProduct,
    });
  } catch (e) {
    console.log(e);
    res.json({ message: e.message });
  }
};

const updateProduct = (req, res, nex) => {};

const deleteProduct = (req, res, nex) => {};

module.exports = {
  getAllProductsByCategory: getAllProductsByCategory,
  addNewProduct: addNewProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
