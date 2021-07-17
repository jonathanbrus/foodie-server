const gifts = require("../../models/otherProducts/gifts");

const addGift = async (prodInfo) => {
  try {
    const addedGift = await gifts.create({
      name: prodInfo.name,
      image: prodInfo.image,
      description: prodInfo.description,
      category: prodInfo.category,
      fixedPrice: prodInfo.fixedPrice,
      offerPrice: prodInfo.offerPrice,
      itemsInStock: prodInfo.itemsInStock,
      rating: 4.2,
    });

    return { result: "added", addedProduct: addedGift };
  } catch (e) {
    return { result: "error", e: e };
  }
};

const updateGift = () => {};

module.exports = {
  addGift: addGift,
  updateGift: updateGift,
};
