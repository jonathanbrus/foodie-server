const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const {
  updateProfile,
  addAddress,
  deleteAddress,
} = require("../controllers/userProfile");

const {
  myCart,
  addToCart,
  removeFromCart,
  modifyQuantity,
} = require("../controllers/carts");

const { myOrders, placeOrder, cancelOrder } = require("../controllers/orders");

const router = express.Router();

router.post("/updateProfile", authMiddleware, updateProfile);

router.post("/addAddress", authMiddleware, addAddress);

router.post("/deleteAddress", authMiddleware, deleteAddress);

router.get("/myCart", authMiddleware, myCart);

router.post("/addToCart", authMiddleware, addToCart);

router.delete("/removeFromCart", authMiddleware, removeFromCart);

router.post("/modifyQuantity", authMiddleware, modifyQuantity);

router.get("/myOrders", authMiddleware, myOrders);

router.post("/placeOrder", authMiddleware, placeOrder);

router.delete("/cancelOrder", authMiddleware, cancelOrder);

module.exports = router;
