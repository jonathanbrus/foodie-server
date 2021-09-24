const carts = require("../models/cart");
const otherProducts = require("../models/products");

const myCart = async (req, res, nex) => {
  try {
    const userCart = await carts.findOne({ userId: req.userId });

    let productIds = [];

    let cart = [];

    if (userCart !== null) {
      userCart.cartItems.forEach((element) => {
        productIds.push(element.productId);
      });

      const items = await otherProducts.find({ _id: productIds });

      cart = [
        ...items.reverse().map((item, index) => {
          return {
            id: item._id,
            name: item.name,
            image: item.image[0],
            fixedPrice: item.fixedPrice,
            offerPrice: item.offerPrice,
            quantity: userCart.cartItems[index].quantity,
          };
        }),
      ];
    }

    res.json({
      message: "Fetched cart items",
      myCartItems: cart,
    });
  } catch (e) {
    console.log(e);
  }
};

const addToCart = async (req, res, nex) => {
  const { productId, quantity } = req.body;

  try {
    const existingCart = await carts.findOne({ userId: req.userId });

    if (existingCart) {
      existingCart.cartItems = [
        { productId: productId, quantity: quantity },
        ...existingCart.cartItems,
      ];

      const updatedCart = await existingCart.save();

      res.json({
        message: "added to cart",
        updatedCart: updatedCart,
      });
    } else {
      const addedCart = await carts.create({
        userId: req.userId,
        cartItems: [{ productId: productId, quantity: quantity }],
      });
      res.json({
        message: "added to cart",
        updatedCart: addedCart,
      });
    }
  } catch (e) {
    console.log(e);
  }
};

const removeFromCart = async (req, res, nex) => {
  const { id } = req.body;

  try {
    const userCart = await carts.findOne({ userId: req.userId });

    userCart.cartItems = userCart.cartItems.filter(
      (cartItem) => `${cartItem.productId}` !== `${id}`
    );

    const updatedCart = await userCart.save();

    res.json({
      message: "Removed from cart",
      updatedCart: updatedCart,
    });
  } catch (e) {
    console.log(e);
  }
};

const modifyQuantity = async (req, res, nex) => {
  const { productId, quantity } = req.body;

  try {
    const userCart = await carts.findOne({ userId: req.userId });

    userCart.cartItems = userCart.cartItems.map((item) => {
      if (`${item.productId}` === `${productId}`) {
        item.quantity = quantity;
      }
      return item;
    });

    const updatedCart = await userCart.save();

    console.log(updatedCart);

    res.json({
      message: "Updated quantity",
      updatedCart: updatedCart,
    });
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  myCart: myCart,
  addToCart: addToCart,
  removeFromCart: removeFromCart,
  modifyQuantity: modifyQuantity,
};
