const groceries = require("../models/otherProducts/groceries");
const cosmetics = require("../models/otherProducts/cosmetics");
const accessories = require("../models/otherProducts/accessories");
const kidsSection = require("../models/otherProducts/kidsSection");
const gifts = require("../models/otherProducts/gifts");

const { addGrocery, updateGrocery } = require("./productsHelper/groceries");
const { addCosmetics, updateCosmetics } = require("./productsHelper/cosmetics");
const {
  addAccessories,
  updateAccessories,
} = require("./productsHelper/accessories");
const {
  addKidsProduct,
  updateKidsProduct,
} = require("./productsHelper/kidsSection");
const { addGift, updateGift } = require("./productsHelper/gifts");

const getAllProductsByCategory = async (req, res, nex) => {
  const { category } = req.query;
  let products;
  switch (category) {
    case "groceries":
      products = await groceries.find();
      break;
    case "cosmetics":
      products = await cosmetics.find();
      break;
    case "accessories":
      products = await accessories.find();
      break;
    case "kidsSection":
      products = await kidsSection.find();
      break;
    case "gifts":
      products = await gifts.find();
      break;

    default:
      products = await groceries.find();
      break;
  }

  res.json({
    message: `fetched ${category}`,
    products: products,
  });
};

const addNewProduct = async (req, res, nex) => {
  const { category, prodInfo } = req.body;

  let result;

  switch (category) {
    case "groceries":
      result = await addGrocery(prodInfo);
      break;
    case "cosmetics":
      result = await addCosmetics(prodInfo);
      break;
    case "accessories":
      result = await addAccessories(prodInfo);
      break;
    case "kidsSection":
      result = await addKidsProduct(prodInfo);
      break;
    case "gifts":
      result = await addGift(prodInfo);
      break;

    default:
      result = await addGrocery(prodInfo);
      break;
  }

  if (result.result === "added") {
    res.json({
      message: `Successfully added product to ${category}`,
      addedProduct: result.addedGrocery,
    });
  } else {
    res.json({ message: result.e.message });
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
