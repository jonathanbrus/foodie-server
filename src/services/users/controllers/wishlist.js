const wishlist = require("../../../models/wishlist");
const carts = require("../../../models/cart");

const error = require("../../../utils/error");

const addToList = async (req, res, nex) => {
  const { productId, wishlistId } = req.body;

  let list = [];

  try {
    if (wishlistId === null) {
      list = await wishlist.create({
        userId: req.body.userId,
        items: [productId],
      });
    } else {
      list = await wishlist.findById(wishlistId);

      existingList.items = [productId, ...existingList.items];
    }

    res.json({
      statusCode: 201,
      message: "added to wishlist",
      wishlist: list,
    });
  } catch (e) {
    res.json(error(500, "Something went wrong"));
  }
};

const removeFromList = async (req, res, nex) => {
  const { productId, wishlistId } = req.body;

  try {
    const list = await wishlist.findById(wishlistId);

    list.items = list.items.filter((item) => `${item}` !== `${productId}`);
  } catch (e) {
    res.json(error(500, "Something went wrong"));
  }
};

const addToList = async (req, res, nex) => {
  const { productId, wishlistId } = req.body;

  let list = [];

  try {
    const userCart = await carts.findOne({ userId: req.userId });

    userCart.cartItems = userCart.cartItems.filter(
      (cartItem) => `${cartItem.productId}` !== `${productId}`
    );

    if (wishlistId === null) {
      list = await wishlist.create({
        userId: req.body.userId,
        items: [productId],
      });
    } else {
      list = await wishlist.findById(wishlistId);

      existingList.items = [productId, ...existingList.items];
    }

    res.json({
      statusCode: 201,
      message: "added to wishlist",
      wishlist: list,
    });
  } catch (e) {
    res.json(error(500, "Something went wrong"));
  }
};

const moveToCart = async (req, res, nex) => {
  const { productId } = req.body;
  try {
    const list = await wishlist.findById(wishlistId);

    list.items = list.items.filter((item) => `${item}` !== `${productId}`);

    const existingCart = await carts.findOne({ userId: req.userId });

    if (existingCart) {
      existingCart.cartItems = [
        { productId: productId, quantity: 1 },
        ...existingCart.cartItems,
      ];

      const updatedCart = await existingCart.save();

      res.json({
        message: "moved to cart",
        updatedCart: updatedCart,
      });
    } else {
      const addedCart = await carts.create({
        userId: req.userId,
        cartItems: [{ productId: productId, quantity: 1 }],
      });
      res.json({
        message: "moved to cart",
        updatedCart: addedCart,
      });
    }
  } catch (e) {
    res.json(error(500, "Something went wrong"));
  }
};

module.exports = {
  addToList: addToList,
  moveToCart: moveToCart,
  removeFromList: removeFromList,
};
