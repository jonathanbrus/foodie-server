const express = require("express");

const { updateProfile, addAddress } = require("../controllers/userProfile");

const {
  addToCart,
  removeFromCart,
  modifyQuantity,
} = require("../controllers/carts");

const { placeOrder } = require("../controllers/orders");

const router = express.Router();

router.post("/updateProfile", updateProfile);

router.post("/addAddress", addAddress);

router.post("/addToCart", addToCart);

router.delete("/removeFromCart", removeFromCart);

router.post("/modifyQuantity", modifyQuantity);

router.post("/placeOrder", placeOrder);

module.exports = router;
