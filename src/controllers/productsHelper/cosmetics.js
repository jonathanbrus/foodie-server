const cosmetics = require("../../models/otherProducts/cosmetics");

const addCosmetics = async (prodInfo) => {
  try {
    const addedCosmetics = await groceries.create({
      name: prodInfo.name,
      image: prodInfo.image,
      description: prodInfo.description,
      category: prodInfo.category,
      fixedPrice: prodInfo.fixedPrice,
      offerPrice: prodInfo.offerPrice,
      itemsInStock: prodInfo.itemsInStock,
      rating: 4.2,
    });

    return { result: "added", addedProduct: addedCosmetics };
  } catch (e) {
    return { result: "error", e: e };
  }
};

const updateCosmetics = () => {};

module.exports = {
  addCosmetics: addCosmetics,
  updateCosmetics: updateCosmetics,
};
