const kidsSection = require("../../models/otherProducts/kidsSection");

const addKidsProduct = async (prodInfo) => {
  try {
    const addedKidsProduct = await kidsSection.create({
      name: prodInfo.name,
      image: prodInfo.image,
      description: prodInfo.description,
      category: prodInfo.category,
      fixedPrice: prodInfo.fixedPrice,
      offerPrice: prodInfo.offerPrice,
      itemsInStock: prodInfo.itemsInStock,
      rating: 4.2,
    });

    return { result: "added", addedProduct: addedKidsProduct };
  } catch (e) {
    return { result: "error", e: e };
  }
};

const updateKidsProduct = () => {};

module.exports = {
  addKidsProduct: addKidsProduct,
  updateKidsProduct: updateKidsProduct,
};
