const carts = require("../models/cart");
const otherProducts = require("../models/otherProducts");

const myCart = async (req, res, nex) => {
  try {
    const userCart = await carts.findOne({ userId: req.userId });

    let productIds = [];

    userCart.cartItems.forEach((element) => {
      productIds.push(element.productId);
    });

    const items = await otherProducts.findById(productIds);
    print(items);
  } catch (e) {
    console.log(e);
  }
};

const addToCart = (req, res, nex) => {};

const removeFromCart = (req, res, nex) => {};

const modifyQuantity = (req, res, nex) => {};

module.exports = {
  myCart: myCart,
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  modifyQuantity: modifyQuantity,
};
