const groceries = require("../../models/otherProducts/groceries");

const addGrocery = async (prodInfo) => {
  try {
    const addedGrocery = await groceries.create({
      name: prodInfo.name,
      image: prodInfo.image,
      description: prodInfo.description,
      category: prodInfo.category,
      fixedPrice: prodInfo.fixedPrice,
      offerPrice: prodInfo.offerPrice,
      itemsInStock: prodInfo.itemsInStock,
      rating: 4.1,
    });

    return { result: "added", addedProduct: addedGrocery };
  } catch (e) {
    return { result: "error", message: e.message };
  }
};

const updateGrocery = () => {};

module.exports = {
  addGrocery: addGrocery,
  updateGrocery: updateGrocery,
};
