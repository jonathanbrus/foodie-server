const express = require("express");

const { signIn, signUp } = require("../controllers/auth");

const { getAllRestaurants } = require("../controllers/restaurants");

const { getFoodItemsByResId } = require("../controllers/foods");

const { getAllProductsByCategory } = require("../controllers/products");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("server is running");
});

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.get("/getAllRestaurants", getAllRestaurants);

router.get("/getFoodItemsByResId", getFoodItemsByResId);

router.get("/getAllProductsByCategory", getAllProductsByCategory);

// Authenticated routes

const userRoutes = require("./userRoutes");

router.use("/user", userRoutes);

const adminRoutes = require("./adminRoutes");

router.use("/admin", adminRoutes);

module.exports = router;
