const groceries = require("../../models/otherProducts/groceries");

const addGrocery = async (prodInfo) => {
  console.log(prodInfo);
  try {
    const addedGrocery = await groceries.create({
      name: prodInfo.name,
      image: prodInfo.image,
      category: prodInfo.category,
      fixedPrice: prodInfo.fixedPrice,
      offerPrice: prodInfo.offerPrice,
      isActive: true,
      rating: 4.1,
    });

    return { result: "added", addedGrocery: addedGrocery };
  } catch (e) {
    return { result: "error", e: e };
  }
};

const updateGrocery = () => {};

module.exports = {
  addGrocery: addGrocery,
  updateGrocery: updateGrocery,
};
