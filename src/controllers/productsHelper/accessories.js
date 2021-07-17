const accessories = require("../../models/otherProducts/accessories");

const addAccessories = async (prodInfo) => {
  try {
    const addedAccessory = await accessories.create({
      name: prodInfo.name,
      image: prodInfo.image,
      description: prodInfo.description,
      category: prodInfo.category,
      fixedPrice: prodInfo.fixedPrice,
      offerPrice: prodInfo.offerPrice,
      itemsInStock: prodInfo.itemsInStock,
      rating: 4.2,
    });

    return { result: "added", addedProduct: addedAccessory };
  } catch (e) {
    return { result: "error", e: e };
  }
};

const updateAccessories = () => {};

module.exports = {
  addAccessories: addAccessories,
  updateAccessories: updateAccessories,
};
