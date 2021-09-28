const express = require("express");

const authMiddleware = require("./middlewares/authenticate");

const { signIn, signUp } = require("./controllers/auth");

const { generateOTP, verifyOTP } = require("./controllers/OTP");

const {
  updateProfile,
  addAddress,
  deleteAddress,
  changePassword,
} = require("./controllers/profile");

const {
  myCart,
  addToCart,
  removeFromCart,
  modifyQuantity,
} = require("./controllers/carts");

const { myOrders, placeOrder, cancelOrder } = require("./controllers/orders");

const router = express.Router();

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/generate-otp", generateOTP);

router.post("/verify-otp", verifyOTP);

router.post("/change-password", changePassword);

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
