const cosmetics = require("../../models/otherProducts/cosmetics");

const addCosmetics = async (prodInfo) => {
  console.log(prodInfo);
  try {
    const addedCosmetics = await cosmetics.create({
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
    console.log(e);
    return { result: "error", e: e };
  }
};

const updateCosmetics = () => {};

module.exports = {
  addCosmetics: addCosmetics,
  updateCosmetics: updateCosmetics,
};
