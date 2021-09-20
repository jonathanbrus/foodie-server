const express = require("express");

const {
  signIn,
  signUp,
  checkIfUserExist,
  verifyOtp,
  changePassword,
} = require("../controllers/auth");

const { getAllRestaurants } = require("../controllers/restaurants");

const { getFoodItemsByResId } = require("../controllers/foods");

const { getAllProductsByCategory } = require("../controllers/products");

const { getSlider } = require("../controllers/sliders");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("server is running");
});

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.post("/check-user-exist", checkIfUserExist);

router.post("/verify-otp", verifyOtp);

router.post("/change-password", changePassword);

router.get("/getAllRestaurants", getAllRestaurants);

router.get("/fetchSlider/:imageFor", getSlider);

router.get("/getFoodItemsByResId", getFoodItemsByResId);

router.get("/getAllProductsByCategory", getAllProductsByCategory);

// Authenticated routes

const userRoutes = require("./userRoutes");

router.use("/user", userRoutes);

const adminRoutes = require("./adminRoutes");

router.use("/admin", adminRoutes);

module.exports = router;
