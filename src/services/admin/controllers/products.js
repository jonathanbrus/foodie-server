const products = require("../../../models/products");

const addNewProduct = async (req, res, nex) => {
  const { category, prodInfo } = req.body;

  try {
    const addedProduct = await products.create({
      name: prodInfo.name.trim(),
      image: prodInfo.image,
      description: prodInfo.description.trim(),
      productDetail: prodInfo.productDetail,
      category: category.trim(),
      subCategory: prodInfo.category.trim(),
      fixedPrice: Number(prodInfo.fixedPrice),
      offerPrice: Number(prodInfo.offerPrice),
      deliveryCharge: Number(prodInfo.deliveryCharge),
      itemsInStock: Number(prodInfo.itemsInStock),
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

const updateProduct = async (req, res, nex) => {
  const { category, prodInfo } = req.body;

  try {
    const fetchedProduct = await products.findOne({
      _id: prodInfo.id,
      category: category,
    });

    fetchedProduct.name = prodInfo.name || fetchedProduct.name.trim();
    fetchedProduct.image = prodInfo.image || fetchedProduct.image;
    fetchedProduct.description =
      prodInfo.description || fetchedProduct.description.trim();
    fetchedProduct.productDetail =
      prodInfo.productDetail || fetchedProduct.productDetail;
    fetchedProduct.category = category || category.trim();
    fetchedProduct.subCategory =
      prodInfo.category || fetchedProduct.category.trim();
    fetchedProduct.fixedPrice =
      prodInfo.fixedPrice || fetchedProduct.fixedPrice;
    fetchedProduct.offerPrice =
      prodInfo.offerPrice || fetchedProduct.offerPrice;
    fetchedProduct.deliveryCharge =
      prodInfo.deliveryCharge || fetchedProduct.deliveryCharge;
    fetchedProduct.itemsInStock =
      prodInfo.itemsInStock || fetchedProduct.itemsInStock;

    const updatedProduct = await fetchedProduct.save();
    res.json({
      message: `Successfully added product to ${category}`,
      updatedProduct: updatedProduct,
    });
  } catch (e) {
    console.log(e);
  }
};

const deleteProduct = async (req, res, nex) => {
  const { prodId } = req.query;
  try {
    await products.deleteOne({ _id: prodId });

    res.json({
      message: "Successfully deleted product",
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  addNewProduct: addNewProduct,
  updateProduct: updateProduct,
  deleteProduct: deleteProduct,
};
