const express = require("express");

const { signIn, signUp } = require("../controllers/auth");

const { getAllRestaurants } = require("../controllers/restaurants");

const { getAllFooItems } = require("../controllers/foods");

const { getAllProducts } = require("../controllers/products");

const router = express.Router();

router.get("/", (req, res) => {
  req.headers.authorization;
  res.send("server is running");
});

router.post("/sign-in", signIn);

router.post("/sign-up", signUp);

router.get("/getAllRestaurants", getAllRestaurants);

router.get("/getAllFooItems", getAllFooItems);

router.get("/getAllProducts", getAllProducts);

// Authenticated routes

const userRoutes = require("./userRoutes");

router.use("/user", userRoutes);

const adminRoutes = require("./adminRoutes");

router.use("/admin", adminRoutes);

module.exports = router;
