const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const { updateProfile, addAddress } = require("../controllers/userProfile");

const {
  addToCart,
  removeFromCart,
  modifyQuantity,
} = require("../controllers/carts");

const { myOrders, placeOrder } = require("../controllers/orders");

const router = express.Router();

router.post("/updateProfile", authMiddleware, updateProfile);

router.post("/addAddress", authMiddleware, addAddress);

router.post("/addToCart", authMiddleware, addToCart);

router.delete("/removeFromCart", authMiddleware, removeFromCart);

router.post("/modifyQuantity", authMiddleware, modifyQuantity);

router.get("/myOrders", authMiddleware, myOrders);

router.post("/placeOrder", authMiddleware, placeOrder);

module.exports = router;
